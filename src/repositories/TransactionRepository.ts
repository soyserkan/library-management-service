import { TypeORMRepository } from './TypeORMRepository';
import { Transaction } from '../models/Transaction';
import { DataSource, IsNull } from 'typeorm';

export class TransactionRepository extends TypeORMRepository<Transaction> {
  constructor(dataSource: DataSource) {
    super(Transaction, dataSource);
  }

  async findBorrowedBook(userId: number, bookId: number): Promise<Transaction | null> {
    return this.findOneBy({ user: { id: userId }, book: { id: bookId }, returned_at: IsNull() });
  }
}