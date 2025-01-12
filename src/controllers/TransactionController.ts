import { NextFunction, Request, Response } from 'express';
import { TransactionService } from '../services/TransactionService';

export class TransactionController {
  private readonly transactionService: TransactionService;

  constructor(transactionService: TransactionService) {
    this.transactionService = transactionService;
  }

  borrowBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId, bookId } = req.params;
      await this.transactionService.borrowBook(Number(userId), Number(bookId));
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  returnBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId, bookId } = req.params;
      await this.transactionService.returnBook(Number(userId), Number(bookId), req.body.score);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}