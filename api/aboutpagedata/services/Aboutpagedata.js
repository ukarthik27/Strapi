'use strict';

/**
 * Aboutpagedata.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all aboutpagedata.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('aboutpagedata', params);
    // Select field to populate.
    const populate = Aboutpagedata.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Aboutpagedata
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an aboutpagedata.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Aboutpagedata.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Aboutpagedata
      .findOne(_.pick(params, _.keys(Aboutpagedata.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count aboutpagedata.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('aboutpagedata', params);

    return Aboutpagedata
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an aboutpagedata.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Aboutpagedata.associations.map(ast => ast.alias));
    const data = _.omit(values, Aboutpagedata.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Aboutpagedata.create(data);

    // Create relational data and return the entry.
    return Aboutpagedata.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an aboutpagedata.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Aboutpagedata.associations.map(a => a.alias));
    const data = _.omit(values, Aboutpagedata.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Aboutpagedata.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Aboutpagedata.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an aboutpagedata.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Aboutpagedata.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Aboutpagedata
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Aboutpagedata.associations.map(async association => {
        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, { multi: true });
      })
    );

    return data;
  },

  /**
   * Promise to search a/an aboutpagedata.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('aboutpagedata', params);
    // Select field to populate.
    const populate = Aboutpagedata.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Aboutpagedata.attributes).reduce((acc, curr) => {
      switch (Aboutpagedata.attributes[curr].type) {
        case 'integer':
        case 'float':
        case 'decimal':
          if (!_.isNaN(_.toNumber(params._q))) {
            return acc.concat({ [curr]: params._q });
          }

          return acc;
        case 'string':
        case 'text':
        case 'password':
          return acc.concat({ [curr]: { $regex: params._q, $options: 'i' } });
        case 'boolean':
          if (params._q === 'true' || params._q === 'false') {
            return acc.concat({ [curr]: params._q === 'true' });
          }

          return acc;
        default:
          return acc;
      }
    }, []);

    return Aboutpagedata
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  }
};
