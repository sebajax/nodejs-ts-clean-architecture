// module import
import { DataSource } from 'typeorm';
// logger import
import { join } from 'path';
import { logger } from '../logging/logger_old';

/**
 * create a connection to the database
 */
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: parseInt(`${process.env.DB_PORT}`),
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  migrations: [join(__dirname, './migration/*{.ts,.js}')],
  entities: [join(__dirname, '../../model/**/*.model.entity{.ts,.js}')],
  synchronize: false,
  logging: true,
});

(async () => {
  try {
    await AppDataSource.initialize();
    logger.info('connection to database has been established successfully.');
    await AppDataSource.runMigrations();
  } catch (error) {
    logger.error(`unable to connect to the database: ${error}`);
  }
})();
