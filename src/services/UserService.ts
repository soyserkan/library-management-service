import { NotFoundError } from '../utils/errors/notFound';
import { User } from '../models/User';
import { TransactionRepository } from '../repositories/TransactionRepository';
import { UserRepository } from '../repositories/UserRepository';
import { ErrorCodes } from '../utils/enums/ErrorCodes';

export class UserService {
  private readonly userRepository: UserRepository;
  private readonly transactionRepository: TransactionRepository;

  constructor(userRepository: UserRepository, transactionRepository: TransactionRepository) {
    this.userRepository = userRepository;
    this.transactionRepository = transactionRepository;
  }

  private getPastTransactions(transactions: any[]) {
    return transactions.filter((transaction) => transaction.returned_at !== null).map(({ book, rating }) => ({
      name: book.name,
      userScore: rating,
    }));
  }

  private getPresentTransactions(transactions: any[]) {
    return transactions.filter((transaction) => transaction.returned_at === null).map(({ book }) => ({
      name: book.name,
    }));
  }

  async getUserById(id: number): Promise<any> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundError(ErrorCodes.USER_NOT_FOUND);
    }

    const transactions = await this.transactionRepository.find({ user: { id } }, { relations: ['book'] });

    return {
      id: user.id,
      name: user.name,
      books: {
        past: this.getPastTransactions(transactions),
        present: this.getPresentTransactions(transactions),
      },
    };
  }

  async getAllUsers(): Promise<{ id: number; name: string }[] | null> {
    const users = await this.userRepository.find({});
    return users.map(({ id, name }) => ({ id, name }));
  }

  async registerUser(userData: Partial<User>): Promise<void> {
    this.userRepository.create(userData);
  }
}