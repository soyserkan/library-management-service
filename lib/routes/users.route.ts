import { Router } from 'express';
import { UsersService } from '../services/users.service';
import { barrowBookValidation, createUserValidation, getUserValidation, returnBookValidation } from '../middlewares/validations/users.validation';

class UsersRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.post('/', createUserValidation, async (req, res, next) => {
            try {
                const { name } = req.body;
                await new UsersService().createUser(name);
                res.status(201).send();
            } catch (error) {
                next(error);
            }
        });

        this.router.get('/', async (_req, res, next) => {
            try {
                const response = await new UsersService().getAllUsers();
                res.json(response);
            } catch (error) {
                next(error);
            }
        });

        this.router.get('/:userId', getUserValidation, async (req, res, next) => {
            try {
                const userId = parseInt(req.params.userId);
                const response = await new UsersService().getUser(userId);
                res.send(response);
            } catch (error) {
                next(error);
            }
        });

        this.router.post('/:userId/borrow/:bookId', barrowBookValidation, async (req, res, next) => {
            try {
                const userId = parseInt(req.params.userId);
                const bookId = parseInt(req.params.bookId);
                await new UsersService().barrowBook(userId, bookId);
                res.status(204).send();
            } catch (error) {
                next(error);
            }
        });

        this.router.post('/:userId/return/:bookId', returnBookValidation, async (req, res, next) => {
            try {
                const userId = parseInt(req.params.userId);
                const bookId = parseInt(req.params.bookId);
                const { score } = req.body;
                await new UsersService().returnBook(userId, bookId, score);
                res.status(204).send();
            } catch (error) {
                next(error);
            }
        });
    }
}

export const usersRoutes = new UsersRouter().router;