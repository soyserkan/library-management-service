import { NotFoundError } from '../utils/errors/notFound';
import { Book } from '../models/Book';
import { BookRepository } from '../repositories/BookRepository';
import { ErrorCodes } from '../utils/enums/ErrorCodes';

export class BookService {
    private readonly bookRepository: BookRepository;

    constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    async getAllBooks(): Promise<Book[]> {
        return this.bookRepository.find({}, { select: ['id', 'name'] });
    }

    async getBookById(id: number): Promise<Book> {
        const book = await this.bookRepository.findOneBy({ id })
        if (!book) {
            throw new NotFoundError(ErrorCodes.BOOK_NOT_FOUND);
        }
        return book;
    }

    async createBook(bookData: Partial<Book>): Promise<void> {
        await this.bookRepository.create(bookData);
    }
}
