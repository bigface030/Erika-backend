'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stocks', [
      {
        id: 1,
        pattern_id: 1,
        total: 100,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        pattern_id: 2,
        total: 100,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        pattern_id: 3,
        total: 100,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        pattern_id: 4,
        total: 100,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        pattern_id: 5,
        total: 100,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        pattern_id: 6,
        total: 100,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        pattern_id: 7,
        total: 10,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        pattern_id: 8,
        total: 10,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        pattern_id: 9,
        total: 10,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        pattern_id: 10,
        total: 10,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        pattern_id: 11,
        total: 20,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        pattern_id: 12,
        total: 20,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        pattern_id: 13,
        total: 20,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        pattern_id: 14,
        total: 20,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        pattern_id: 15,
        total: 40,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        pattern_id: 16,
        total: 40,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        pattern_id: 17,
        total: 40,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        pattern_id: 18,
        total: 40,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 19,
        pattern_id: 19,
        total: 40,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        pattern_id: 20,
        total: 40,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 21,
        pattern_id: 21,
        total: 30,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 22,
        pattern_id: 22,
        total: 30,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 23,
        pattern_id: 23,
        total: 25,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 24,
        pattern_id: 24,
        total: 25,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 25,
        pattern_id: 25,
        total: 5,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 26,
        pattern_id: 26,
        total: 5,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 27,
        pattern_id: 27,
        total: 5,
        type: '上架',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Stocks', null, {});
  }
};
