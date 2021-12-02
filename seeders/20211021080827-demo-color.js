'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Colors', [
      {
        id: 1,
        product_id: 1,
        name: 'white',
        code: 'fafafa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        product_id: 1,
        name: 'grey',
        code: 'c9c9c9',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        product_id: 1,
        name: 'black',
        code: '1a1a1a',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        product_id: 2,
        name: 'black',
        code: '1a1a1a',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        product_id: 2,
        name: 'khaki',
        code: 'b6a98e',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        product_id: 3,
        name: 'brown',
        code: '918481',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        product_id: 3,
        name: 'dark grey',
        code: '535358',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        product_id: 4,
        name: 'black',
        code: '212121',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        product_id: 4,
        name: 'grey',
        code: '707475',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        product_id: 4,
        name: 'white',
        code: 'e8e6e2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        product_id: 5,
        name: 'black',
        code: '212121',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        product_id: 6,
        name: 'black',
        code: '212121',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        product_id: 7,
        name: 'yellow',
        code: 'd4ad54',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        product_id: 7,
        name: 'brown',
        code: '8b523d',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        product_id: 7,
        name: 'green',
        code: 'b6e889',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        product_id: 8,
        name: 'black',
        code: '212121',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        product_id: 9,
        name: 'khaki',
        code: 'b8683c',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        product_id: 9,
        name: 'dark grey',
        code: '535358',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 19,
        product_id: 10,
        name: 'blue',
        code: '2b5760',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        product_id: 11,
        name: 'magenta',
        code: 'd50157',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 21,
        product_id: 12,
        name: 'red',
        code: '841d13',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 22,
        product_id: 12,
        name: 'blue',
        code: '505283',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 23,
        product_id: 13,
        name: 'blue',
        code: '4c76c8',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Colors', null, {});
  }
};
