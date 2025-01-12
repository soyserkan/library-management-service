import { NextFunction, Request, Response } from 'express';
import { BookService } from '../services/BookService';

export class BookController {
  private readonly bookService: BookService;

  constructor(bookService: BookService) {
    this.bookService = bookService;
  }

  getBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const book = await this.bookService.getBookById(Number(req.params.bookId));
      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }

  getAllBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const books = await this.bookService.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }

  createBook = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {
      await this.bookService.createBook(req.body);
      res.status(201).json();
    } catch (error) {
      next(error);
    }
  }
}