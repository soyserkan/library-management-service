import { Sequelize } from 'sequelize';
import BookDelivery from '../models/deliveries.model';
import User from '../models/users.model';
import Book from '../models/books.model';
import { ErrorCodes } from '../utils/ErrorCodes';
import { NotFoundError } from '../middlewares/errors/not-found.errors';
import { BadRequestError } from '../middlewares/errors/bad-request.error';

export class UsersService {

  async getAllUsers() {
    const users = await User.findAll();
    return users;
  }

  async getUser(userId: number) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new NotFoundError(ErrorCodes.USER_NOT_FOUND);
    }

    const deliveries = await BookDelivery.findAll({
      where: { user_id: userId },
      include: [{
        model: Book,
        attributes: ['name']
      }]
    });

    const past = deliveries.filter((delivery) => delivery.delivered_date).map(({ Book, score }) => ({ name: Book?.name, userScore: score }));
    const present = deliveries.filter((delivery) => !delivery.delivered_date).map(({ Book }) => ({ name: Book?.name }));
    return { id: user.id, name: user.name, books: { past, present } };
  }

  async createUser(name: string) {
    await User.create({ name });
  }

  async barrowBook(userId: number, bookId: number) {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundError(ErrorCodes.USER_NOT_FOUND);
    }

    const book = await Book.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundError(ErrorCodes.BOOK_NOT_FOUND);
    }

    if (book.is_barrowed) {
      throw new BadRequestError(ErrorCodes.BOOK_ALREADY_BORROWED);
    }

    const bookUpdate = Book.update({ is_barrowed: true }, { where: { id: book.id } });
    const createDelivery = BookDelivery.create({ book_id: book.id, user_id: user.id });
    await Promise.all([bookUpdate, createDelivery]);
  }

  async returnBook(userId: number, bookId: number, score: number) {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundError(ErrorCodes.USER_NOT_FOUND);
    }

    const book = await Book.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundError(ErrorCodes.BOOK_NOT_FOUND);
    }

    if (!book.is_barrowed) {
      throw new BadRequestError(ErrorCodes.BOOK_ALREADY_RETURNED);
    }

    const bookDelivery = await BookDelivery.findOne({ where: { book_id: book.id, user_id: user.id } });
    if (!bookDelivery) {
      throw new BadRequestError(ErrorCodes.BOOK_NOT_BORROWED);
    }

    const bookUpdate = Book.update({ is_barrowed: false }, { where: { id: book.id } });
    const deliveryUpdate = BookDelivery.update({ delivered_date: Sequelize.fn('NOW'), score }, { where: { id: bookDelivery.id } });
    await Promise.all([bookUpdate, deliveryUpdate]);
  }
}