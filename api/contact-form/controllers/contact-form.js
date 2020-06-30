const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    const modelName = "contact-form";
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services[modelName].create(data, { files });
    } else {
      entity = await strapi.services[modelName].create(ctx.request.body);
    }
    await strapi.plugins['email'].services.email.send({
      to : 'vikas.p@bewdigital.com',
      from : "strapi@admin.io",
      subject: "new request"
    })
    return sanitizeEntity(entity, { model: strapi.models[modelName] });
  },
};
