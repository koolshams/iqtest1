const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const colleges = sequelize.define(
    'colleges',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      location: {
        type: DataTypes.TEXT,
      },

      state: {
        type: DataTypes.TEXT,
      },

      state_type: {
        type: DataTypes.ENUM,

        values: ['inState', 'outState'],
      },

      type: {
        type: DataTypes.ENUM,

        values: ['private', 'public'],
      },

      ivy_league: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      reasons_to_go: {
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

  colleges.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.colleges.hasMany(db.my_colleges, {
      as: 'my_colleges_link_to_college',
      foreignKey: {
        name: 'link_to_collegeId',
      },
      constraints: false,
    });

    //end loop

    db.colleges.belongsTo(db.company, {
      as: 'company',
      foreignKey: {
        name: 'companyId',
      },
      constraints: false,
    });

    db.colleges.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.colleges.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return colleges;
};
