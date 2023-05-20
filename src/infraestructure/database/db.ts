// module import
import {Sequelize} from 'sequelize';
// logger import
import {logger} from '../log/logger';

/**
 * create a connection to the database
 */
const db = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASSWORD}`,
  {
    logging: msg => logger.debug(msg),
    host: `${process.env.DB_HOST}`,
    dialect: 'postgres',
    dialectOptions: {
      socketPath: process.env.DB_SOCKET || null,
    },
    pool: {
      max: parseInt(`${process.env.DB_POOL_MAX}`, 10) || 5,
      min: parseInt(`${process.env.DB_POOL_MIN}`, 10) || 0,
      acquire: parseInt(`${process.env.DB_POOL_ACQUIRE}`, 10) || 30000,
      idle: parseInt(`${process.env.DB_POOL_IDLE}`, 10) || 10000,
    },
  }
);

(async () => {
  try {
    await db.authenticate();
    logger.info('connection to database has been established successfully.');
  } catch (error) {
    logger.error(`unable to connect to the database: ${error}`);
  }
})();

export default db;
