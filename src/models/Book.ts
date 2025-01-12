import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from './Transaction';

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'float', default: -1 })
    score: number;

    @OneToMany(() => Transaction, (transaction) => transaction.book)
    transactions: Transaction[];

    updateAverageRating() {
        const totalRating = this.transactions.reduce((acc, t) => acc + t.rating, 0);
        const totalReviews = this.transactions.filter(t => t.rating > 0).length;
        this.score = totalReviews > 0 ? totalRating / totalReviews : -1;
    }
}
