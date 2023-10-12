import express from 'express';
import routeHandler from '../controllers/books.js';
const { getBooks, postBook, getBookById, deleteBook, updateBook } = routeHandler;

const router = express.Router();

router.route('/').get(getBooks).post(postBook)
router.route('/:id').get(getBookById).put(updateBook).delete(deleteBook)

export default router;
