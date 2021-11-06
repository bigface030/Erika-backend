'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        id: 101,
        group: 'top',
        name: '上衣類',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 102,
        group: 'top',
        name: '襯衫類',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 103,
        group: 'top',
        name: '上衣/襯衫',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 104,
        group: 'top',
        name: '針織衫/毛衣',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 105,
        group: 'top',
        name: '洋裝類',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 106,
        group: 'top',
        name: '外套類',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 201,
        group: 'bottom',
        name: '褲裝類',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 301,
        group: 'skirt',
        name: '裙子類',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 401,
        group: 'general',
        name: '配件類',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
