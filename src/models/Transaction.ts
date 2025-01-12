import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { User } from './User';
import { Book } from './Book';

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.transactions)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Book, (book) => book.transactions)
    @JoinColumn({ name: 'book_id' })
    book: Book;

    @Column({ type: 'timestamp', nullable: true })
    borrowed_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    returned_at: Date;

    @Column({ type: 'float', nullable: true })
    rating: number;
}
