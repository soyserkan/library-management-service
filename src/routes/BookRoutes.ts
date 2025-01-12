import express from 'express';
import { BookRepository } from '../repositories/BookRepository';
import { BookService } from '../services/BookService';
import { BookController } from '../controllers/BookController';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import { createBookSchema, getBookSchema } from '../utils/validation/bookSchemas';
import { AppDataSource } from '../config/dataSource';

const router = express.Router();

const bookRepository = new BookRepository(AppDataSource);
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

router.get('/', bookController.getAllBooks);
router.get('/:bookId', validationMiddleware(getBookSchema, 'params'), bookController.getBook);
router.post('/', validationMiddleware(createBookSchema), bookController.createBook);

export default router;