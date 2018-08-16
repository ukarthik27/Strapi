'use strict';

/**
 * Userinfo.js controller
 *
 * @description: A set of functions called "actions" for managing `Userinfo`.
 */

module.exports = {

  /**
   * Retrieve userinfo records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.userinfo.search(ctx.query);
    } else {
      return strapi.services.userinfo.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a userinfo record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.userinfo.fetch(ctx.params);
  },

  /**
   * Count userinfo records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.userinfo.count(ctx.query);
  },

  /**
   * Create a/an userinfo record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.userinfo.add(ctx.request.body);
  },

  /**
   * Update a/an userinfo record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.userinfo.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an userinfo record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.userinfo.remove(ctx.params);
  }
};
