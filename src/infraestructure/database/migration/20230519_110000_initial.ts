// module import
import { DataTypes } from 'sequelize';
// migration type import
import { Migration } from '../migrator';

export const up: Migration = async ({
  context: queryInterface,
}): Promise<void> => {
  await queryInterface.createTable('user', {
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
    },
  });

  await queryInterface.createTable('message', {
    messageId: {
      field: 'message_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    details: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    messageTimestamp: {
      field: 'message_timestamp',
      type: DataTypes.DATE,
      allowNull: false,
    },
    topScore: {
      field: 'top_score',
      type: DataTypes.JSONB,
      allowNull: false,
    },
    room: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
    },
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
  });

  /*
  --- add constraints to tables ---
  */
  await queryInterface.addConstraint('user', {
    fields: ['email'],
    type: 'unique',
    name: 'unique_constraint_user_email',
  });

  /*
    --- add indexes to tables ---
  */
  await queryInterface.addIndex('message', ['room'], {
    name: 'idx_message_room',
  });
  await queryInterface.addIndex('user', ['email'], {
    name: 'idx_user_email',
  });
};

export const down: Migration = async ({
  context: queryInterface,
}): Promise<void> => {
  /*
  --- remove constraints to tables ---
  */
  await queryInterface.removeConstraint('user', 'unique_constraint_user_email');
  /*
  --- remove indexes to tables ---
  */
  await queryInterface.removeIndex('message', 'idx_message_room');
  await queryInterface.removeIndex('user', 'idx_user_email');

  /*
  --- remove tables ---
  */
  await queryInterface.dropTable('user');
  await queryInterface.dropTable('message');
};
