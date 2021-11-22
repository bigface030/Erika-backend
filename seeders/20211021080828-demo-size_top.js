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
      {
        id: 9,
        product_id: 8,
        size: 'M',
        body_length: 61,
        body_width: 52,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        product_id: 8,
        size: 'L',
        body_length: 63.5,
        body_width: 55,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        product_id: 9,
        size: 'M',
        sleeve_length: 85,
        body_length: 96,
        body_width: 57.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        product_id: 9,
        size: 'L',
        sleeve_length: 87.5,
        body_length: 98,
        body_width: 59.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        product_id: 11,
        size: 'M',
        sleeve_length: 84.5,
        body_length: 67,
        body_width: 57.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        product_id: 11,
        size: 'L',
        sleeve_length: 87,
        body_length: 69,
        body_width: 60.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        product_id: 12,
        size: 'M',
        sleeve_length: 77,
        body_length: 54,
        body_width: 62.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        product_id: 12,
        size: 'L',
        sleeve_length: 79,
        body_length: 56.5,
        body_width: 65.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        product_id: 13,
        size: 'M',
        sleeve_length: 83.5,
        body_length: 76,
        body_width: 53,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        product_id: 13,
        size: 'L',
        sleeve_length: 86,
        body_length: 78,
        body_width: 56,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Size_tops', null, {});
  }
};
