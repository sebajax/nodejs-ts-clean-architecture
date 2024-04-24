// module import
import { MigrationError, SequelizeStorage, Umzug } from 'umzug';
// db import
import db from './db';
// logger import
import { QueryInterface } from 'sequelize';
import { logger } from '../log/logger';

const migrator = new Umzug({
  migrations: { glob: `${process.env.MIGRATION_DIR}` },
  context: db.getQueryInterface() as QueryInterface,
  storage: new SequelizeStorage({
    sequelize: db,
    modelName: 'migration',
  }),
  logger,
});

export default migrator;
export { MigrationError, migrator };
