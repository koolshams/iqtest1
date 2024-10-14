const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class CounselorsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const counselors = await db.counselors.create(
      {
        id: data.id || undefined,

        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await counselors.setUser(data.user || null, {
      transaction,
    });

    await counselors.setCompany(data.company || null, {
      transaction,
    });

    await counselors.setStudents(data.students || [], {
      transaction,
    });

    return counselors;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const counselorsData = data.map((item, index) => ({
      id: item.id || undefined,

      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const counselors = await db.counselors.bulkCreate(counselorsData, {
      transaction,
    });

    // For each item created, replace relation files

    return counselors;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const counselors = await db.counselors.findByPk(id, {}, { transaction });

    await counselors.update(
      {
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await counselors.setUser(data.user || null, {
      transaction,
    });

    await counselors.setCompany(data.company || null, {
      transaction,
    });

    await counselors.setStudents(data.students || [], {
      transaction,
    });

    return counselors;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const counselors = await db.counselors.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of counselors) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of counselors) {
        await record.destroy({ transaction });
      }
    });

    return counselors;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const counselors = await db.counselors.findByPk(id, options);

    await counselors.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await counselors.destroy({
      transaction,
    });

    return counselors;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const counselors = await db.counselors.findOne({ where }, { transaction });

    if (!counselors) {
      return counselors;
    }

    const output = counselors.get({ plain: true });

    output.user = await counselors.getUser({
      transaction,
    });

    output.students = await counselors.getStudents({
      transaction,
    });

    output.company = await counselors.getCompany({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'user',
      },

      {
        model: db.company,
        as: 'company',
      },

      {
        model: db.students,
        as: 'students',
        through: filter.students
          ? {
              where: {
                [Op.or]: filter.students.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.students ? true : null,
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.user) {
        const listItems = filter.user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          userId: { [Op.or]: listItems },
        };
      }

      if (filter.company) {
        const listItems = filter.company.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          companyId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.counselors.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.counselors.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('counselors', 'user', query),
        ],
      };
    }

    const records = await db.counselors.findAll({
      attributes: ['id', 'user'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['user', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.user,
    }));
  }
};
