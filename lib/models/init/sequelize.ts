import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: 'postgres',
  quoteIdentifiers: false,
  logging: false,
});

export default sequelize;