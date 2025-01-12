import express from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositories/UserRepository';
import { TransactionRepository } from '../repositories/TransactionRepository';
import { TransactionService } from '../services/TransactionService';
import { BookRepository } from '../repositories/BookRepository';
import { TransactionController } from '../controllers/TransactionController';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import { borrowBookSchema, createUserSchema, getUserSchema, returnBookBodySchema, returnBookParamsSchema } from '../utils/validation/userSchemas';
import { AppDataSource } from '../config/dataSource';

const router = express.Router();

const userRepository = new UserRepository(AppDataSource);
const bookRepository = new BookRepository(AppDataSource);
const transactionRepository = new TransactionRepository(AppDataSource);

const userService = new UserService(userRepository, transactionRepository);
const transactionService = new TransactionService(userRepository, bookRepository, transactionRepository);

const userController = new UserController(userService);
const transactionController = new TransactionController(transactionService);

router.get('/', userController.getAllUsers);
router.get('/:userId', validationMiddleware(getUserSchema, 'params'), userController.getUser);
router.post('/', validationMiddleware(createUserSchema), userController.createUser);
router.post('/:userId/borrow/:bookId', validationMiddleware(borrowBookSchema, 'params'), transactionController.borrowBook);
router.post('/:userId/return/:bookId', validationMiddleware(returnBookParamsSchema, 'params'), validationMiddleware(returnBookBodySchema, 'body'), transactionController.returnBook);


export default router;