import { TypeORMRepository } from './TypeORMRepository';
import { Book } from '../models/Book';
import { DataSource } from 'typeorm';

export class BookRepository extends TypeORMRepository<Book> {
  constructor(dataSource: DataSource) {
    super(Book, dataSource);
  }

  async getBookWithTransactions(bookId: number) {
    return this.findOneBy({ id: bookId }, { relations: ["transactions"] });
  }
}