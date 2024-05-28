// Module import
import { join } from 'path';
import { DataSource } from 'typeorm';

// Create a connection to the database
const AppDataSource = new DataSource({
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: parseInt(`${process.env.DB_PORT}`),
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  migrations: [join(__dirname, './migration/*{.ts,.js}')],
  entities: [
    join(
      __dirname,
      '../../adapters/repositories/**/*.repository.entity{.ts,.js}'
    ),
  ],
  synchronize: false,
  logging: true,
});

(async () => {
  try {
    await AppDataSource.initialize();
    console.info('Connection to database has been established successfully.');
    await AppDataSource.runMigrations();
  } catch (error) {
    console.error(`Unable to connect to the database: ${error}`);
  }
})();

export { AppDataSource };
