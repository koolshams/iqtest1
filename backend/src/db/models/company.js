const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const company = sequelize.define(
    'company',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
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

  company.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.company.hasMany(db.users, {
      as: 'users_company',
      foreignKey: {
        name: 'companyId',
      },
      constraints: false,
    });

    db.company.hasMany(db.action_items, {
      as: 'action_items_company',
      foreignKey: {
        name: 'companyId',
      },
      constraints: false,
    });

    db.company.hasMany(db.colleges, {
      as: 'colleges_company',
      foreignKey: {
        name: 'companyId',
      },
      constraints: false,
    });

    db.company.hasMany(db.companies, {
      as: 'companies_company',
      foreignKey: {
        name: 'companyId',
      },
      constraints: false,
    });

    db.company.hasMany(db.counselors, {
      as: 'counselors_company',
      foreignKey: {
        name: 'companyId',
      },
      constraints: false,
    });

    db.company.hasMany(db.my_colleges, {
      as: 'my_colleges_company',
      foreignKey: {
        name: 'companyId',
      },
      constraints: false,
    });

    db.company.hasMany(db.parents, {
      as: 'parents_company',
      foreignKey: {
        name: 'companyId',
      },
      constraints: false,
    });

    db.company.hasMany(db.sessions, {
      as: 'sessions_company',
      foreignKey: {
        name: 'companyId',
      },
      constraints: false,
    });

    db.company.hasMany(db.students, {
      as: 'students_company',
      foreignKey: {
        name: 'companyId',
      },
      constraints: false,
    });

    //end loop

    db.company.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.company.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return company;
};
