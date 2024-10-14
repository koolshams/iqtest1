module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'users',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'action_items',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'colleges',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'companies',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'counselors',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'my_colleges',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'parents',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'sessions',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'students',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'roles',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'permissions',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'company',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'firstName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'lastName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'phoneNumber',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'email',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'disabled',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'password',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerified',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerificationToken',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerificationTokenExpiresAt',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'passwordResetToken',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'passwordResetTokenExpiresAt',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'provider',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'action_items',
        'title',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'action_items',
        'due_date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'action_items',
        'category',
        {
          type: Sequelize.DataTypes.ENUM,

          values: [
            'academics',
            'athletics',
            'communityengagement',
            'personalproject',
          ],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'action_items',
        'comments',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'action_items',
        'status',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['notstarted', 'inprogress', 'completed'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'action_items',
        'output',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'colleges',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'colleges',
        'location',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'colleges',
        'state',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'colleges',
        'state_type',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['inState', 'outState'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'colleges',
        'type',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['private', 'public'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'colleges',
        'ivy_league',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'colleges',
        'reasons_to_go',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'counselors',
        'userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'my_colleges',
        'link_to_collegeId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'colleges',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'my_colleges',
        'suggested_atlas_score',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'my_colleges',
        'challenge',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['HighReach', 'Reach', 'Target', 'Safe'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'parents',
        'userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'sessions',
        'date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'sessions',
        'title',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'sessions',
        'time',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'sessions',
        'link_to_recording',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'sessions',
        'session_details',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'sessions',
        'prep_summary',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'students',
        'userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'permissions',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'roles',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'roles',
        'role_customization',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'app_roleId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'roles',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'company',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'roles',
        'globalAccess',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'companyId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'company',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'action_items',
        'companyId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'company',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'colleges',
        'companyId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'company',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'companyId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'company',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'counselors',
        'companyId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'company',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'my_colleges',
        'companyId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'company',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'parents',
        'companyId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'company',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'sessions',
        'companyId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'company',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'students',
        'companyId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'company',
            key: 'id',
          },
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('students', 'companyId', {
        transaction,
      });

      await queryInterface.removeColumn('sessions', 'companyId', {
        transaction,
      });

      await queryInterface.removeColumn('parents', 'companyId', {
        transaction,
      });

      await queryInterface.removeColumn('my_colleges', 'companyId', {
        transaction,
      });

      await queryInterface.removeColumn('counselors', 'companyId', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'companyId', {
        transaction,
      });

      await queryInterface.removeColumn('colleges', 'companyId', {
        transaction,
      });

      await queryInterface.removeColumn('action_items', 'companyId', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'companyId', { transaction });

      await queryInterface.removeColumn('roles', 'globalAccess', {
        transaction,
      });

      await queryInterface.removeColumn('company', 'name', { transaction });

      await queryInterface.removeColumn('users', 'app_roleId', { transaction });

      await queryInterface.removeColumn('roles', 'role_customization', {
        transaction,
      });

      await queryInterface.removeColumn('roles', 'name', { transaction });

      await queryInterface.removeColumn('permissions', 'name', { transaction });

      await queryInterface.removeColumn('students', 'userId', { transaction });

      await queryInterface.removeColumn('sessions', 'prep_summary', {
        transaction,
      });

      await queryInterface.removeColumn('sessions', 'session_details', {
        transaction,
      });

      await queryInterface.removeColumn('sessions', 'link_to_recording', {
        transaction,
      });

      await queryInterface.removeColumn('sessions', 'time', { transaction });

      await queryInterface.removeColumn('sessions', 'title', { transaction });

      await queryInterface.removeColumn('sessions', 'date', { transaction });

      await queryInterface.removeColumn('parents', 'userId', { transaction });

      await queryInterface.removeColumn('my_colleges', 'challenge', {
        transaction,
      });

      await queryInterface.removeColumn(
        'my_colleges',
        'suggested_atlas_score',
        { transaction },
      );

      await queryInterface.removeColumn('my_colleges', 'link_to_collegeId', {
        transaction,
      });

      await queryInterface.removeColumn('counselors', 'userId', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'name', { transaction });

      await queryInterface.removeColumn('colleges', 'reasons_to_go', {
        transaction,
      });

      await queryInterface.removeColumn('colleges', 'ivy_league', {
        transaction,
      });

      await queryInterface.removeColumn('colleges', 'type', { transaction });

      await queryInterface.removeColumn('colleges', 'state_type', {
        transaction,
      });

      await queryInterface.removeColumn('colleges', 'state', { transaction });

      await queryInterface.removeColumn('colleges', 'location', {
        transaction,
      });

      await queryInterface.removeColumn('colleges', 'name', { transaction });

      await queryInterface.removeColumn('action_items', 'output', {
        transaction,
      });

      await queryInterface.removeColumn('action_items', 'status', {
        transaction,
      });

      await queryInterface.removeColumn('action_items', 'comments', {
        transaction,
      });

      await queryInterface.removeColumn('action_items', 'category', {
        transaction,
      });

      await queryInterface.removeColumn('action_items', 'due_date', {
        transaction,
      });

      await queryInterface.removeColumn('action_items', 'title', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'provider', { transaction });

      await queryInterface.removeColumn(
        'users',
        'passwordResetTokenExpiresAt',
        { transaction },
      );

      await queryInterface.removeColumn('users', 'passwordResetToken', {
        transaction,
      });

      await queryInterface.removeColumn(
        'users',
        'emailVerificationTokenExpiresAt',
        { transaction },
      );

      await queryInterface.removeColumn('users', 'emailVerificationToken', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'emailVerified', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'password', { transaction });

      await queryInterface.removeColumn('users', 'disabled', { transaction });

      await queryInterface.removeColumn('users', 'email', { transaction });

      await queryInterface.removeColumn('users', 'phoneNumber', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'lastName', { transaction });

      await queryInterface.removeColumn('users', 'firstName', { transaction });

      await queryInterface.dropTable('company', { transaction });

      await queryInterface.dropTable('permissions', { transaction });

      await queryInterface.dropTable('roles', { transaction });

      await queryInterface.dropTable('students', { transaction });

      await queryInterface.dropTable('sessions', { transaction });

      await queryInterface.dropTable('parents', { transaction });

      await queryInterface.dropTable('my_colleges', { transaction });

      await queryInterface.dropTable('counselors', { transaction });

      await queryInterface.dropTable('companies', { transaction });

      await queryInterface.dropTable('colleges', { transaction });

      await queryInterface.dropTable('action_items', { transaction });

      await queryInterface.dropTable('users', { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
