const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Action_itemsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const action_items = await db.action_items.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        due_date: data.due_date || null,
        category: data.category || null,
        comments: data.comments || null,
        status: data.status || null,
        output: data.output || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await action_items.setCompany(data.company || null, {
      transaction,
    });

    return action_items;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const action_itemsData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      due_date: item.due_date || null,
      category: item.category || null,
      comments: item.comments || null,
      status: item.status || null,
      output: item.output || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const action_items = await db.action_items.bulkCreate(action_itemsData, {
      transaction,
    });

    // For each item created, replace relation files

    return action_items;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const action_items = await db.action_items.findByPk(
      id,
      {},
      { transaction },
    );

    await action_items.update(
      {
        title: data.title || null,
        due_date: data.due_date || null,
        category: data.category || null,
        comments: data.comments || null,
        status: data.status || null,
        output: data.output || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await action_items.setCompany(data.company || null, {
      transaction,
    });

    return action_items;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const action_items = await db.action_items.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of action_items) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of action_items) {
        await record.destroy({ transaction });
      }
    });

    return action_items;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const action_items = await db.action_items.findByPk(id, options);

    await action_items.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await action_items.destroy({
      transaction,
    });

    return action_items;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const action_items = await db.action_items.findOne(
      { where },
      { transaction },
    );

    if (!action_items) {
      return action_items;
    }

    const output = action_items.get({ plain: true });

    output.company = await action_items.getCompany({
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
        model: db.company,
        as: 'company',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.title) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('action_items', 'title', filter.title),
        };
      }

      if (filter.comments) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('action_items', 'comments', filter.comments),
        };
      }

      if (filter.output) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('action_items', 'output', filter.output),
        };
      }

      if (filter.due_dateRange) {
        const [start, end] = filter.due_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            due_date: {
              ...where.due_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            due_date: {
              ...where.due_date,
              [Op.lte]: end,
            },
          };
        }
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

      if (filter.category) {
        where = {
          ...where,
          category: filter.category,
        };
      }

      if (filter.status) {
        where = {
          ...where,
          status: filter.status,
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
          count: await db.action_items.count({
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
      : await db.action_items.findAndCountAll({
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
          Utils.ilike('action_items', 'title', query),
        ],
      };
    }

    const records = await db.action_items.findAll({
      attributes: ['id', 'title'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['title', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }
};
