import { RepositoryOptions } from './RepositoryOption';

export interface BaseRepository<T> {
    findOneBy(where: object, options?: RepositoryOptions): Promise<T | null>;
    find(where: object, options?: RepositoryOptions): Promise<T[]>;
    create(data: Partial<T>): Promise<void>;
    save(entity: Partial<T>): Promise<void>;
    update(id: number, data: Partial<T>): Promise<T | null>;
}
