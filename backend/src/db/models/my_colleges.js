const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const my_colleges = sequelize.define(
    'my_colleges',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      suggested_atlas_score: {
        type: DataTypes.INTEGER,
      },

      challenge: {
        type: DataTypes.ENUM,

        values: ['HighReach', 'Reach', 'Target', 'Safe'],
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

  my_colleges.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.my_colleges.belongsTo(db.colleges, {
      as: 'link_to_college',
      foreignKey: {
        name: 'link_to_collegeId',
      },
      constraints: false,
    });

    db.my_colleges.belongsTo(db.company, {
      as: 'company',
      foreignKey: {
        name: 'companyId',
      },
      constraints: false,
    });

    db.my_colleges.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.my_colleges.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return my_colleges;
};
