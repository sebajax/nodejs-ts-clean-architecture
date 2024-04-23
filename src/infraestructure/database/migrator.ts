// module import
import { SequelizeStorage, Umzug } from 'umzug';
// db import
import db from './db';
// logger import
import { logger } from '../log/logger';

const migrator = new Umzug({
  migrations: { glob: `${process.env.MIGRATION_DIR}` },
  context: db.getQueryInterface(),
  storage: new SequelizeStorage({
    sequelize: db,
    modelName: 'migration',
  }),
  logger,
});

// export the type helper exposed by umzug, which will have the `context` argument typed correctly
export type Migration = typeof migrator._types.migration;

export default migrator;
