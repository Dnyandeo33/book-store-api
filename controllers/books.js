let books = [
    {
        id: '1',
        name: 'Life of Pi',
        author: 'Yann Martel',
        description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt exercitationem iste,
        voluptatum, quia explicabo laboriosam rem adipisci voluptates cumque, veritatis atque
        nostrum corrupti ipsa asperiores harum? Dicta odio aut hic.`,
        src: 'https://www.movienewsletters.net/photos/070671R1.jpg',
    },
    {
        id: '2',
        name: 'The Scarlet Pimpernel',
        author: 'Baroness Orczy',
        description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt exercitationem iste,
        voluptatum, quia explicabo laboriosam rem adipisci voluptates cumque, veritatis atque
        nostrum corrupti ipsa asperiores harum? Dicta odio aut hic.`,
        src: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSoPX_I0h4v27_nFFRWSYEE_czlnWtEBKAp4FXu4uM2Qb4j4Oxe'
    },
    {
        id: '3',
        name: 'Fourth Wing',
        author: 'Baroness Orczy',
        description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt exercitationem iste,
        voluptatum, quia explicabo laboriosam rem adipisci voluptates cumque, veritatis atque
        nostrum corrupti ipsa asperiores harum? Dicta odio aut hic.`,
        src: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTMGygN6vmJYLi9nkL769kQfNDg3kt-zfrb1AQRkAnvtiUysGdh'
    },
    {
        id: '4',
        name: 'Things We Never Got Over',
        author: 'Lucy Score',
        description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt exercitationem iste,
        voluptatum, quia explicabo laboriosam rem adipisci voluptates cumque, veritatis atque
        nostrum corrupti ipsa asperiores harum? Dicta odio aut hic.`,
        src: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1641629293i/60060431.jpg"
    },
    {
        id: '5',
        name: 'Be Useful: Seven Tools for Life',
        author: 'Arnold Schwarzenegger',
        description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt exercitationem iste,
        voluptatum, quia explicabo laboriosam rem adipisci voluptates cumque, veritatis atque
        nostrum corrupti ipsa asperiores harum? Dicta odio aut hic.`,
        src: 'https://m.media-amazon.com/images/I/91H1uVS7QxL.jpg'
    },
];

const getBooksById = (id) => {
    return books.find((book) => book.id === id);
};

const routeHandler = {
    getBooks: (req, res) => {
        res.status(200).render('books', { books: books });
    },

    getBookById: (req, res) => {
        const { id } = req.params;
        const bookExist = getBooksById(id);
        if (bookExist) {
            res.status(200).render('book', { bookExist: bookExist });
        } else {
            res.status(200).json({ message: `Book doesn't exist with id ${id}` });
        }
    },

    postBook: (req, res) => {
        const { name, author, src } = req.body;

        const newBook = {
            id: String(books.length + 1),
            name: name,
            author: author,
            src: src
        }
        books.push(newBook)
        res.status(201).json(newBook)
    },

    updateBook: (req, res) => {
        const { id } = req.params;
        const { name, author, src } = req.body;

        const bookExist = getBooksById(id);
        if (bookExist) {
            books.forEach((book, index) => {
                if (book.id === id) {
                    const updateBook = { id: id, name: name, author: author, src: src }
                    books[index] = updateBook;
                    res.status(200).json(updateBook)
                }
            })
        } else {
            res.status(404).json({ message: `Book doesn't exist with id ${id}` })
        }
    },

    deleteBook: (req, res) => {
        const { id } = req.params;
        const bookExist = getBooksById(id);

        if (bookExist) {
            books = books.filter((book) => book.id !== id)
            res.status(200).json({ message: `Book deleted with successfully` })
        } else {
            res.status(200).json({ message: `Book is doesn't exist with id ${id}` })
        }
    }
}

export default routeHandler;