const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class SessionsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const sessions = await db.sessions.create(
      {
        id: data.id || undefined,

        date: data.date || null,
        title: data.title || null,
        time: data.time || null,
        link_to_recording: data.link_to_recording || null,
        session_details: data.session_details || null,
        prep_summary: data.prep_summary || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await sessions.setCompany(data.company || null, {
      transaction,
    });

    await sessions.setAction_items(data.action_items || [], {
      transaction,
    });

    return sessions;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const sessionsData = data.map((item, index) => ({
      id: item.id || undefined,

      date: item.date || null,
      title: item.title || null,
      time: item.time || null,
      link_to_recording: item.link_to_recording || null,
      session_details: item.session_details || null,
      prep_summary: item.prep_summary || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const sessions = await db.sessions.bulkCreate(sessionsData, {
      transaction,
    });

    // For each item created, replace relation files

    return sessions;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const sessions = await db.sessions.findByPk(id, {}, { transaction });

    await sessions.update(
      {
        date: data.date || null,
        title: data.title || null,
        time: data.time || null,
        link_to_recording: data.link_to_recording || null,
        session_details: data.session_details || null,
        prep_summary: data.prep_summary || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await sessions.setCompany(data.company || null, {
      transaction,
    });

    await sessions.setAction_items(data.action_items || [], {
      transaction,
    });

    return sessions;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const sessions = await db.sessions.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of sessions) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of sessions) {
        await record.destroy({ transaction });
      }
    });

    return sessions;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const sessions = await db.sessions.findByPk(id, options);

    await sessions.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await sessions.destroy({
      transaction,
    });

    return sessions;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const sessions = await db.sessions.findOne({ where }, { transaction });

    if (!sessions) {
      return sessions;
    }

    const output = sessions.get({ plain: true });

    output.action_items = await sessions.getAction_items({
      transaction,
    });

    output.company = await sessions.getCompany({
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

      {
        model: db.action_items,
        as: 'action_items',
        through: filter.action_items
          ? {
              where: {
                [Op.or]: filter.action_items.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.action_items ? true : null,
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
          [Op.and]: Utils.ilike('sessions', 'title', filter.title),
        };
      }

      if (filter.link_to_recording) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'sessions',
            'link_to_recording',
            filter.link_to_recording,
          ),
        };
      }

      if (filter.session_details) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'sessions',
            'session_details',
            filter.session_details,
          ),
        };
      }

      if (filter.prep_summary) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'sessions',
            'prep_summary',
            filter.prep_summary,
          ),
        };
      }

      if (filter.calendarStart && filter.calendarEnd) {
        where = {
          ...where,
          [Op.or]: [
            {
              date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
            {
              time: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
          ],
        };
      }

      if (filter.dateRange) {
        const [start, end] = filter.dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            date: {
              ...where.date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            date: {
              ...where.date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.timeRange) {
        const [start, end] = filter.timeRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            time: {
              ...where.time,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            time: {
              ...where.time,
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
          count: await db.sessions.count({
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
      : await db.sessions.findAndCountAll({
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
          Utils.ilike('sessions', 'title', query),
        ],
      };
    }

    const records = await db.sessions.findAll({
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
