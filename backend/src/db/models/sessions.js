const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const sessions = sequelize.define(
    'sessions',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      date: {
        type: DataTypes.DATE,
      },

      title: {
        type: DataTypes.TEXT,
      },

      time: {
        type: DataTypes.DATE,
      },

      link_to_recording: {
        type: DataTypes.TEXT,
      },

      session_details: {
        type: DataTypes.TEXT,
      },

      prep_summary: {
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

  sessions.associate = (db) => {
    db.sessions.belongsToMany(db.action_items, {
      as: 'action_items',
      foreignKey: {
        name: 'sessions_action_itemsId',
      },
      constraints: false,
      through: 'sessionsAction_itemsAction_items',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.sessions.belongsTo(db.company, {
      as: 'company',
      foreignKey: {
        name: 'companyId',
      },
      constraints: false,
    });

    db.sessions.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.sessions.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return sessions;
};
