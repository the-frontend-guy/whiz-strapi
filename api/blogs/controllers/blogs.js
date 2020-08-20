"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function removeElement(array, elem) {
  var index = array.indexOf(elem);
  if (index > -1) {
    array.splice(index, 1);
  }
}

module.exports = {
  async find(ctx) {
    let entities;
    let count;
    if (ctx.query._q) {
      entities = await strapi.services.blogs.search(ctx.query);
      count = await strapi.services.blogs.countSearch(ctx.query);
    } else {
      entities = await strapi.services.blogs.find(ctx.query);
      count = await strapi.services.blogs.count(ctx.query);
    }

    return {
      count: count,
      articles: entities.map((entity) =>
        sanitizeEntity(entity, { model: strapi.models.blogs })
      ),
    };
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.services.blogs.findOne({ slug: id });
    const entityCategoryBlogs = await strapi.services.blogs.find({
      "blog_category.category": entity.blog_category.category,
    });
    let categoryIds = entityCategoryBlogs.map((e) => e.id);
    const currentIdPosition = categoryIds.findIndex((e) => e === entity.id);
    let previous = null;
    let next = null;
    let suggested = [];

    if (categoryIds.length > 1 && currentIdPosition) {
      previous = entityCategoryBlogs.filter(
        (e) => e.id === categoryIds[currentIdPosition - 1]
      )[0];
    }

    if (categoryIds.length > 1 && currentIdPosition <= categoryIds.length - 2) {
      next = entityCategoryBlogs.filter(
        (e) => e.id === categoryIds[currentIdPosition + 1]
      )[0];
    }

    removeElement(categoryIds, entity.id);

    if (previous) {
      removeElement(categoryIds, previous.id);
    }

    if (next) {
      removeElement(categoryIds, next.id);
    }

    if (categoryIds.length) {
      shuffleArray(categoryIds);

      suggested.push(
        entityCategoryBlogs.filter((e) => e.id === categoryIds[0])[0]
      );

      if (categoryIds.length > 1) {
        suggested.push(
          entityCategoryBlogs.filter((e) => e.id === categoryIds[1])[0]
        );
      }
    }

    return {
      blogData: sanitizeEntity(entity, { model: strapi.models.blogs }),
      prev: previous
        ? sanitizeEntity(previous, { model: strapi.models.blogs })
        : null,
      next: next ? sanitizeEntity(next, { model: strapi.models.blogs }) : null,
      suggested: suggested.length
        ? suggested.map((entity) =>
            sanitizeEntity(entity, { model: strapi.models.blogs })
          )
        : null,
    };
  },

  async home(ctx) {
    const categories = await strapi.services["blog-categories"].find(ctx.query);
    const count = await strapi.services.blogs.count(ctx.query);
    let blogs = [];
    const categoriesId = categories.map((e) => e.id);
    categoriesId.shift();

    if (count) {
      if (count <= 2 || categoriesId.length <= 1) {
        blogs = await strapi.services.blogs.find({
          _limit: 2,
        });
      } else {
        shuffleArray(categoriesId);

        const blog1 = await strapi.services.blogs.findOne({
          "blog_category.category": categories.filter(
            (e) => e.id === categoriesId[0]
          )[0].category,
          _limit: 1,
        });

        const blog2 = await strapi.services.blogs.findOne({
          "blog_category.category": categories.filter(
            (e) => e.id === categoriesId[1]
          )[0].category,
          _limit: 1,
        });

        blogs.push(blog1);
        blogs.push(blog2);
      }
    }

    return {
      count: count,
      articles: blogs.length && blogs.map((entity) =>
        sanitizeEntity(entity, { model: strapi.models.blogs })
      ),
    };
  },
};
