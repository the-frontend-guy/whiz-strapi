'use strict';
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services['blog-categories'].search(ctx.query);
    } else {
      entities = await strapi.services['blog-categories'].find(ctx.query);
    }

    const mapped = entities.map(e => {e.blogs =  e.blogs.length; return e})

    return mapped.map((entity) =>
    sanitizeEntity(entity, { model: strapi.models['blog-categories'] })
  )
  }
};
