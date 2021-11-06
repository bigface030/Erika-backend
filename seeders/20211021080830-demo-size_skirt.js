'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Size_skirts', [
      {
        id: 1,
        product_id: 6,
        size: 'S',
        waist: '63.5~76',
        hip: 107,
        length: 44.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        product_id: 6,
        size: 'M',
        waist: '68.5~81',
        hip: 112,
        length: 46,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Size_skirts', null, {});
  }
};
