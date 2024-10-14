const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const counselors = sequelize.define(
    'counselors',
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

  counselors.associate = (db) => {
    db.counselors.belongsToMany(db.students, {
      as: 'students',
      foreignKey: {
        name: 'counselors_studentsId',
      },
      constraints: false,
      through: 'counselorsStudentsStudents',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.counselors.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.counselors.belongsTo(db.company, {
      as: 'company',
      foreignKey: {
        name: 'companyId',
      },
      constraints: false,
    });

    db.counselors.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.counselors.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return counselors;
};
