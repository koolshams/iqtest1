const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const students = sequelize.define(
    'students',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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

  students.associate = (db) => {
    db.students.belongsToMany(db.action_items, {
      as: 'action_items',
      foreignKey: {
        name: 'students_action_itemsId',
      },
      constraints: false,
      through: 'studentsAction_itemsAction_items',
    });

    db.students.belongsToMany(db.sessions, {
      as: 'sessions',
      foreignKey: {
        name: 'students_sessionsId',
      },
      constraints: false,
      through: 'studentsSessionsSessions',
    });

    db.students.belongsToMany(db.my_colleges, {
      as: 'my_colleges',
      foreignKey: {
        name: 'students_my_collegesId',
      },
      constraints: false,
      through: 'studentsMy_collegesMy_colleges',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.students.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.students.belongsTo(db.company, {
      as: 'company',
      foreignKey: {
        name: 'companyId',
      },
      constraints: false,
    });

    db.students.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.students.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return students;
};
