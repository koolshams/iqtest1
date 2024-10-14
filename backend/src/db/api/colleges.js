const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class CollegesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const colleges = await db.colleges.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        location: data.location || null,
        state: data.state || null,
        state_type: data.state_type || null,
        type: data.type || null,
        ivy_league: data.ivy_league || false,

        reasons_to_go: data.reasons_to_go || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await colleges.setCompany(data.company || null, {
      transaction,
    });

    return colleges;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const collegesData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      location: item.location || null,
      state: item.state || null,
      state_type: item.state_type || null,
      type: item.type || null,
      ivy_league: item.ivy_league || false,

      reasons_to_go: item.reasons_to_go || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const colleges = await db.colleges.bulkCreate(collegesData, {
      transaction,
    });

    // For each item created, replace relation files

    return colleges;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const colleges = await db.colleges.findByPk(id, {}, { transaction });

    await colleges.update(
      {
        name: data.name || null,
        location: data.location || null,
        state: data.state || null,
        state_type: data.state_type || null,
        type: data.type || null,
        ivy_league: data.ivy_league || false,

        reasons_to_go: data.reasons_to_go || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await colleges.setCompany(data.company || null, {
      transaction,
    });

    return colleges;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const colleges = await db.colleges.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of colleges) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of colleges) {
        await record.destroy({ transaction });
      }
    });

    return colleges;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const colleges = await db.colleges.findByPk(id, options);

    await colleges.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await colleges.destroy({
      transaction,
    });

    return colleges;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const colleges = await db.colleges.findOne({ where }, { transaction });

    if (!colleges) {
      return colleges;
    }

    const output = colleges.get({ plain: true });

    output.my_colleges_link_to_college =
      await colleges.getMy_colleges_link_to_college({
        transaction,
      });

    output.company = await colleges.getCompany({
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

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('colleges', 'name', filter.name),
        };
      }

      if (filter.location) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('colleges', 'location', filter.location),
        };
      }

      if (filter.state) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('colleges', 'state', filter.state),
        };
      }

      if (filter.reasons_to_go) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'colleges',
            'reasons_to_go',
            filter.reasons_to_go,
          ),
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

      if (filter.state_type) {
        where = {
          ...where,
          state_type: filter.state_type,
        };
      }

      if (filter.type) {
        where = {
          ...where,
          type: filter.type,
        };
      }

      if (filter.ivy_league) {
        where = {
          ...where,
          ivy_league: filter.ivy_league,
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
          count: await db.colleges.count({
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
      : await db.colleges.findAndCountAll({
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
          Utils.ilike('colleges', 'name', query),
        ],
      };
    }

    const records = await db.colleges.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
