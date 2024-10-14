const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const action_items = sequelize.define(
    'action_items',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
      },

      due_date: {
        type: DataTypes.DATE,
      },

      category: {
        type: DataTypes.ENUM,

        values: [
          'academics',

          'athletics',

          'communityengagement',

          'personalproject',
        ],
      },

      comments: {
        type: DataTypes.TEXT,
      },

      status: {
        type: DataTypes.ENUM,

        values: ['notstarted', 'inprogress', 'completed'],
      },

      output: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  action_items.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.action_items.belongsTo(db.company, {
      as: 'company',
      foreignKey: {
        name: 'companyId',
      },
      constraints: false,
    });

    db.action_items.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.action_items.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return action_items;
};
