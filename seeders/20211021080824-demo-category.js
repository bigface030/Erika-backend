'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        id: 101,
        group: 'Size_tops',
        name: 'tops',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 102,
        group: 'Size_tops',
        name: 'shirts',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 104,
        group: 'Size_tops',
        name: 'knit',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 105,
        group: 'Size_tops',
        name: 'one_piece',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 106,
        group: 'Size_tops',
        name: 'outer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 201,
        group: 'Size_bottoms',
        name: 'bottoms',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 301,
        group: 'Size_skirts',
        name: 'skirts',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 401,
        group: 'Size_generals',
        name: 'general',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
