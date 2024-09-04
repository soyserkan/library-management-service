import { Router } from 'express';
import { BooksService } from '../services/books.service';
import { createBookValidation, getBookValidation } from '../middlewares/validations/books.validation';

class BooksRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes() {

        this.router.get('/', async (_req, res, next) => {
            try {
                const response = await new BooksService().getAllBooks();
                res.send(response);
            } catch (error) {
                next(error);
            }
        });

        this.router.get('/:bookId', getBookValidation, async (req, res, next) => {
            try {
                const bookId = parseInt(req.params.bookId);
                const response = await new BooksService().getBook(bookId);
                res.send(response);
            } catch (error) {
                next(error);
            }
        });

        this.router.post('/', createBookValidation, async (req, res, next) => {
            try {
                const { name } = req.body;
                await new BooksService().createBook(name);
                res.status(201).send();
            } catch (error) {
                next(error);
            }
        });
    }
}

export const booksRoutes = new BooksRouter().router;