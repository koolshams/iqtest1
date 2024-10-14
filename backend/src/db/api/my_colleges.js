const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class My_collegesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const my_colleges = await db.my_colleges.create(
      {
        id: data.id || undefined,

        suggested_atlas_score: data.suggested_atlas_score || null,
        challenge: data.challenge || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await my_colleges.setLink_to_college(data.link_to_college || null, {
      transaction,
    });

    await my_colleges.setCompany(data.company || null, {
      transaction,
    });

    return my_colleges;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const my_collegesData = data.map((item, index) => ({
      id: item.id || undefined,

      suggested_atlas_score: item.suggested_atlas_score || null,
      challenge: item.challenge || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const my_colleges = await db.my_colleges.bulkCreate(my_collegesData, {
      transaction,
    });

    // For each item created, replace relation files

    return my_colleges;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const my_colleges = await db.my_colleges.findByPk(id, {}, { transaction });

    await my_colleges.update(
      {
        suggested_atlas_score: data.suggested_atlas_score || null,
        challenge: data.challenge || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await my_colleges.setLink_to_college(data.link_to_college || null, {
      transaction,
    });

    await my_colleges.setCompany(data.company || null, {
      transaction,
    });

    return my_colleges;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const my_colleges = await db.my_colleges.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of my_colleges) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of my_colleges) {
        await record.destroy({ transaction });
      }
    });

    return my_colleges;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const my_colleges = await db.my_colleges.findByPk(id, options);

    await my_colleges.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await my_colleges.destroy({
      transaction,
    });

    return my_colleges;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const my_colleges = await db.my_colleges.findOne(
      { where },
      { transaction },
    );

    if (!my_colleges) {
      return my_colleges;
    }

    const output = my_colleges.get({ plain: true });

    output.link_to_college = await my_colleges.getLink_to_college({
      transaction,
    });

    output.company = await my_colleges.getCompany({
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
        model: db.colleges,
        as: 'link_to_college',
      },

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

      if (filter.suggested_atlas_scoreRange) {
        const [start, end] = filter.suggested_atlas_scoreRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            suggested_atlas_score: {
              ...where.suggested_atlas_score,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            suggested_atlas_score: {
              ...where.suggested_atlas_score,
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

      if (filter.challenge) {
        where = {
          ...where,
          challenge: filter.challenge,
        };
      }

      if (filter.link_to_college) {
        const listItems = filter.link_to_college.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          link_to_collegeId: { [Op.or]: listItems },
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
          count: await db.my_colleges.count({
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
      : await db.my_colleges.findAndCountAll({
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
          Utils.ilike('my_colleges', 'link_to_college', query),
        ],
      };
    }

    const records = await db.my_colleges.findAll({
      attributes: ['id', 'link_to_college'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['link_to_college', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.link_to_college,
    }));
  }
};
