'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Patterns', [
      {
        id: 1,
        product_id: 1,
        size_top_id: 1,
        color_id: 1,
        total: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        product_id: 1,
        size_top_id: 1,
        color_id: 2,
        total: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        product_id: 1,
        size_top_id: 1,
        color_id: 3,
        total: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        product_id: 1,
        size_top_id: 2,
        color_id: 1,
        total: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        product_id: 1,
        size_top_id: 2,
        color_id: 2,
        total: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        product_id: 1,
        size_top_id: 2,
        color_id: 3,
        total: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        product_id: 2,
        size_top_id: 3,
        color_id: 4,
        total: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        product_id: 2,
        size_top_id: 3,
        color_id: 5,
        total: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        product_id: 2,
        size_top_id: 4,
        color_id: 4,
        total: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        product_id: 2,
        size_top_id: 4,
        color_id: 5,
        total: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        product_id: 3,
        size_top_id: 5,
        color_id: 6,
        total: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        product_id: 3,
        size_top_id: 5,
        color_id: 7,
        total: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        product_id: 3,
        size_top_id: 6,
        color_id: 6,
        total: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        product_id: 3,
        size_top_id: 6,
        color_id: 7,
        total: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        product_id: 4,
        size_top_id: 7,
        color_id: 8,
        total: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        product_id: 4,
        size_top_id: 7,
        color_id: 9,
        total: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        product_id: 4,
        size_top_id: 7,
        color_id: 10,
        total: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        product_id: 4,
        size_top_id: 8,
        color_id: 8,
        total: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 19,
        product_id: 4,
        size_top_id: 8,
        color_id: 9,
        total: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        product_id: 4,
        size_top_id: 8,
        color_id: 10,
        total: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 21,
        product_id: 5,
        size_bottom_id: 1,
        color_id: 11,
        total: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 22,
        product_id: 5,
        size_bottom_id: 2,
        color_id: 11,
        total: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 23,
        product_id: 6,
        size_skirt_id: 1,
        color_id: 12,
        total: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 24,
        product_id: 6,
        size_skirt_id: 2,
        color_id: 12,
        total: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 25,
        product_id: 7,
        size_general_id: 1,
        color_id: 13,
        total: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 26,
        product_id: 7,
        size_general_id: 1,
        color_id: 14,
        total: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 27,
        product_id: 7,
        size_general_id: 1,
        color_id: 15,
        total: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 28,
        product_id: 8,
        size_top_id: 9,
        color_id: 16,
        total: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 29,
        product_id: 8,
        size_top_id: 10,
        color_id: 16,
        total: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 30,
        product_id: 9,
        size_top_id: 11,
        color_id: 17,
        total: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 31,
        product_id: 9,
        size_top_id: 11,
        color_id: 18,
        total: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 32,
        product_id: 9,
        size_top_id: 12,
        color_id: 17,
        total: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 33,
        product_id: 9,
        size_top_id: 12,
        color_id: 18,
        total: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 34,
        product_id: 10,
        size_bottom_id: 3,
        color_id: 19,
        total: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 35,
        product_id: 10,
        size_bottom_id: 4,
        color_id: 19,
        total: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 36,
        product_id: 11,
        size_top_id: 13,
        color_id: 20,
        total: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 37,
        product_id: 11,
        size_top_id: 14,
        color_id: 20,
        total: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 38,
        product_id: 12,
        size_top_id: 15,
        color_id: 21,
        total: 35,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 39,
        product_id: 12,
        size_top_id: 15,
        color_id: 22,
        total: 35,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 40,
        product_id: 12,
        size_top_id: 16,
        color_id: 21,
        total: 35,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 41,
        product_id: 12,
        size_top_id: 16,
        color_id: 22,
        total: 35,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 42,
        product_id: 13,
        size_top_id: 17,
        color_id: 23,
        total: 32,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 43,
        product_id: 13,
        size_top_id: 18,
        color_id: 23,
        total: 32,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Patterns', null, {});
  }
};
