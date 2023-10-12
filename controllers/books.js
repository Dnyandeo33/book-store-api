let books = [
    {
        id: '1',
        Name: 'JavaScript',
        Author: 'xyz abc'
    },
    {
        id: '2',
        Name: 'Java',
        Author: 'abc xyz'
    }
];

const getBooksById = (id) => {
    return books.find((book) => book.id === id);
};

const routeHandler = {
    getBooks: (req, res) => {
        res.status(200).json(books);
    },

    getBookById: (req, res) => {
        const { id } = req.params;
        const bookExist = getBooksById(id);
        if (bookExist) {
            res.status(200).json(bookExist);
        } else {
            res.status(200).json({ message: `Book doesn't exist with id ${id}` });
        }
    },

    postBook: (req, res) => {
        const { Name, Author } = req.body;

        const newBook = {
            id: String(books.length + 1),
            Name: Name,
            Author: Author
        }
        books.push(newBook)
        res.status(201).json(newBook)
    },

    updateBook: (req, res) => {
        const { id } = req.params;
        const { Name, Author } = req.body;

        const bookExist = getBooksById(id);
        if (bookExist) {
            books.forEach((book, index) => {
                if (book.id === id) {
                    const updateBook = { id: id, Name: Name, Author: Author }
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