import BookDelivery from '../models/deliveries.model';
import Book from '../models/books.model';
import { Op } from 'sequelize';
import { ErrorCodes } from '../utils/ErrorCodes';
import { NotFoundError } from '../middlewares/errors/not-found.errors';

export class BooksService {

    async getAllBooks() {
        const books = await Book.findAll({});
        return books.map(({ id, name }) => ({ id, name }));
    }

    async getBook(bookId: number) {
        const book = await Book.findOne({ where: { id: bookId } });
        if (!book) {
            throw new NotFoundError(ErrorCodes.BOOK_NOT_FOUND);
        }

        const deliveries = await BookDelivery.findAll({ where: { book_id: book.id, delivered_date: { [Op.not]: null } } });
        const score = deliveries.length ? (deliveries.reduce((acc, { score }) => acc + score, 0) / deliveries.length) : -1;
        return { id: book.id, name: book.name, score };
    }

    async createBook(name: string) {
        await Book.create({ name });
    }

}