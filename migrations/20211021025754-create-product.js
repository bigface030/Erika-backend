'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.ENUM,
        values: ['M', 'F', 'G'],
      },
      category_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.TEXT
      },
      material: {
        type: Sequelize.STRING
      },
      washing: {
        type: Sequelize.STRING
      },
      sold: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      price_standard: {
        type: Sequelize.INTEGER
      },
      price_sale: {
        type: Sequelize.INTEGER
      },
      is_on: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      is_sale: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};