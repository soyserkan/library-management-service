import { DataSource } from 'typeorm';
import path from 'path';
import { readdirSync } from 'fs';

const entitiesPath = path.resolve(__dirname, '../models');
const migrationsPath = path.resolve(__dirname, '../migrations/**/*.{ts,js}');

const dynamicEntities = readdirSync(entitiesPath)
    .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))
    .map((file) => {
        const entityModule = require(`${entitiesPath}/${file}`);
        return entityModule.default || Object.values(entityModule)[0];
    });


export class DataSourceFactory {
    static createDataSource(): DataSource {
        return new DataSource({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            synchronize: process.env.NODE_ENV !== 'production',
            logging: process.env.NODE_ENV !== 'production',
            entities: dynamicEntities,
            migrations: [migrationsPath],
        });
    }
}

export const AppDataSource = DataSourceFactory.createDataSource();