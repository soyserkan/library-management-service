import { Repository, EntityTarget, ObjectLiteral, DeepPartial, FindOptionsWhere, DataSource } from 'typeorm';
import { BaseRepository } from '../utils/interfaces/BaseRepository';
import { RepositoryOptions } from '../utils/interfaces/RepositoryOption';

export class TypeORMRepository<T extends ObjectLiteral> implements BaseRepository<T> {
    private readonly repository: Repository<T>;

    constructor(entity: EntityTarget<T>, dataSource: DataSource) {
        this.repository = dataSource.getRepository(entity);
    }

    async findOneBy(where: FindOptionsWhere<T>, options?: RepositoryOptions): Promise<T | null> {
        return this.repository.findOne({
            where,
            relations: options?.relations,
            select: options?.select as any,
        });
    }

    async find(where: FindOptionsWhere<T>, options?: RepositoryOptions): Promise<T[]> {
        return this.repository.find({
            where,
            relations: options?.relations,
            select: options?.select as any,
        });
    }

    async create(data: Partial<T>): Promise<void> {
        const newEntity = this.repository.create(data as DeepPartial<T>);
        this.repository.save(newEntity);
    }

    async save(entity: Partial<T>): Promise<void> {
        this.repository.save(entity as DeepPartial<T>);
    }

    async update(id: number, data: Partial<T>): Promise<T | null> {
        const entity = await this.findOneBy({ id: id as any });
        if (!entity) return null;
        Object.assign(entity, data);
        return this.repository.save(entity);
    }
}
