'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Patterns', [
      {
        id: 1,
        product_id: 1,
        size_top_id: 1,
        color_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        product_id: 1,
        size_top_id: 1,
        color_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        product_id: 1,
        size_top_id: 1,
        color_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        product_id: 1,
        size_top_id: 2,
        color_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        product_id: 1,
        size_top_id: 2,
        color_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        product_id: 1,
        size_top_id: 2,
        color_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        product_id: 2,
        size_top_id: 3,
        color_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        product_id: 2,
        size_top_id: 3,
        color_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        product_id: 2,
        size_top_id: 4,
        color_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        product_id: 2,
        size_top_id: 4,
        color_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        product_id: 3,
        size_top_id: 5,
        color_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        product_id: 3,
        size_top_id: 5,
        color_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        product_id: 3,
        size_top_id: 6,
        color_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        product_id: 3,
        size_top_id: 6,
        color_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        product_id: 4,
        size_top_id: 7,
        color_id: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        product_id: 4,
        size_top_id: 7,
        color_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        product_id: 4,
        size_top_id: 7,
        color_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        product_id: 4,
        size_top_id: 8,
        color_id: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 19,
        product_id: 4,
        size_top_id: 8,
        color_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        product_id: 4,
        size_top_id: 8,
        color_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 21,
        product_id: 5,
        size_bottom_id: 1,
        color_id: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 22,
        product_id: 5,
        size_bottom_id: 2,
        color_id: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 23,
        product_id: 6,
        size_skirt_id: 1,
        color_id: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 24,
        product_id: 6,
        size_skirt_id: 2,
        color_id: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 25,
        product_id: 7,
        size_general_id: 1,
        color_id: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 26,
        product_id: 7,
        size_general_id: 1,
        color_id: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 27,
        product_id: 7,
        size_general_id: 1,
        color_id: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Patterns', null, {});
  }
};
