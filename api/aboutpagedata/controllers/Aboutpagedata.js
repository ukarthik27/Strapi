'use strict';

/**
 * Aboutpagedata.js controller
 *
 * @description: A set of functions called "actions" for managing `Aboutpagedata`.
 */

module.exports = {

  /**
   * Retrieve aboutpagedata records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.aboutpagedata.search(ctx.query);
    } else {
      return strapi.services.aboutpagedata.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a aboutpagedata record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.aboutpagedata.fetch(ctx.params);
  },

  /**
   * Count aboutpagedata records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.aboutpagedata.count(ctx.query);
  },

  /**
   * Create a/an aboutpagedata record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.aboutpagedata.add(ctx.request.body);
  },

  /**
   * Update a/an aboutpagedata record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.aboutpagedata.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an aboutpagedata record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.aboutpagedata.remove(ctx.params);
  }
};
