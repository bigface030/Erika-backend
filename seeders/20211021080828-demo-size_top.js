'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Size_tops', [
      {
        id: 1,
        product_id: 1,
        size: 'M',
        sleeve_length: 41.5,
        body_length: 69,
        body_width: 51,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        product_id: 1,
        size: 'L',
        sleeve_length: 43.5,
        body_length: 72,
        body_width: 54,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        product_id: 2,
        size: 'M',
        sleeve_length: 81,
        body_length: 115,
        body_width: 64.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        product_id: 2,
        size: 'L',
        sleeve_length: 82.5,
        body_length: 117,
        body_width: 67.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        product_id: 3,
        size: 'M',
        sleeve_length: 58.5,
        body_length: 68,
        body_width: 49,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        product_id: 3,
        size: 'L',
        sleeve_length: 60,
        body_length: 70,
        body_width: 52,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        product_id: 4,
        size: 'M',
        sleeve_length: 78.5,
        body_length: 64,
        body_width: 51,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        product_id: 4,
        size: 'L',
        sleeve_length: 81,
        body_length: 67,
        body_width: 54,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Size_tops', null, {});
  }
};
