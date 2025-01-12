import { TypeORMRepository } from './TypeORMRepository';
import { User } from '../models/User';
import { DataSource } from 'typeorm';

export class UserRepository extends TypeORMRepository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource);
  }
}