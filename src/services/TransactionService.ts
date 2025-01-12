import { NotFoundError } from '../utils/errors/notFound';
import { UserRepository } from '../repositories/UserRepository';
import { TransactionRepository } from '../repositories/TransactionRepository';
import { BookRepository } from '../repositories/BookRepository';
import { ErrorCodes } from '../utils/enums/ErrorCodes';
import { BadRequestError } from '../utils/errors/badRequest';
import { Transaction } from '../models/Transaction';
import { IsNull } from 'typeorm';

export class TransactionService {
    private readonly userRepository: UserRepository;
    private readonly bookRepository: BookRepository;
    private readonly transactionRepository: TransactionRepository;

    constructor(userRepository: UserRepository, bookRepository: BookRepository, transactionRepository: TransactionRepository) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.transactionRepository = transactionRepository;
    }

    private isBookBorrowed(book: any): boolean {
        return book.transactions.some((transaction: Transaction) => !transaction.returned_at);
    }

    private async updateBookRating(bookId: number): Promise<void> {
        const book = await this.bookRepository.getBookWithTransactions(bookId);
        if (!book) {
            throw new NotFoundError(ErrorCodes.BOOK_NOT_FOUND);
        }

        book.updateAverageRating();
        await this.bookRepository.save(book);
    }

    async borrowBook(userId: number, bookId: number): Promise<void> {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundError(ErrorCodes.USER_NOT_FOUND);
        }

        const book = await this.bookRepository.getBookWithTransactions(bookId);
        if (!book) {
            throw new NotFoundError(ErrorCodes.BOOK_NOT_FOUND);
        }

        if (this.isBookBorrowed(book)) {
            throw new BadRequestError(ErrorCodes.BOOK_ALREADY_BORROWED);
        }

        await this.transactionRepository.create({ user, book, borrowed_at: new Date() });
    }

    async returnBook(userId: number, bookId: number, rating: number): Promise<void> {
        const transaction = await this.transactionRepository.findBorrowedBook(userId, bookId);
        if (!transaction) {
            throw new NotFoundError(ErrorCodes.BOOK_NOT_BORROWED);
        }

        await this.transactionRepository.update(transaction.id, { returned_at: new Date(), rating });

        await this.updateBookRating(bookId);
    }
}
