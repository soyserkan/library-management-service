import express, { Application, Request, Response } from 'express';
import { ErrorHandlerMiddleware } from './middlewares/errorHandler.middleware';
import { usersRoutes } from './routes/users.route';
import { booksRoutes } from './routes/books.route';

export class App {
    public server: Application;

    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(express.json());
    }

    private routes(): void {
        this.server.use('/', express.Router());
        this.server.get('/', (_req: Request, res: Response) => res.json('Welcome to Library Management System'));
        this.server.use('/users', usersRoutes);
        this.server.use('/books', booksRoutes);
        this.server.use(ErrorHandlerMiddleware);
    }
}