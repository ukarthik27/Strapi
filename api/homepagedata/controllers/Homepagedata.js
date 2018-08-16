'use strict';

/**
 * Homepagedata.js controller
 *
 * @description: A set of functions called "actions" for managing `Homepagedata`.
 */

module.exports = {

  /**
   * Retrieve homepagedata records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.homepagedata.search(ctx.query);
    } else {
      return strapi.services.homepagedata.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a homepagedata record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.homepagedata.fetch(ctx.params);
  },

  /**
   * Count homepagedata records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.homepagedata.count(ctx.query);
  },

  /**
   * Create a/an homepagedata record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.homepagedata.add(ctx.request.body);
  },

  /**
   * Update a/an homepagedata record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.homepagedata.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an homepagedata record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.homepagedata.remove(ctx.params);
  }
};
