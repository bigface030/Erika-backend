'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Products', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'Products_category_id_foreign',
      references: {
        table: 'Categories',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('Images', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'Images_product_id_foreign',
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('Colors', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'Colors_product_id_foreign',
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('Size_tops', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'Size_tops_product_id_foreign',
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('Size_bottoms', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'Size_bottoms_product_id_foreign',
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('Size_skirts', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'Size_skirts_product_id_foreign',
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('Size_generals', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'Size_generals_product_id_foreign',
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('Patterns', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'Patterns_product_id_foreign',
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('Patterns', {
      fields: ['size_top_id'],
      type: 'foreign key',
      name: 'Patterns_size_top_id_foreign',
      references: {
        table: 'Size_tops',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('Patterns', {
      fields: ['size_bottom_id'],
      type: 'foreign key',
      name: 'Patterns_size_bottom_id_foreign',
      references: {
        table: 'Size_bottoms',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('Patterns', {
      fields: ['size_skirt_id'],
      type: 'foreign key',
      name: 'Patterns_size_skirt_id_foreign',
      references: {
        table: 'Size_skirts',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('Patterns', {
      fields: ['size_general_id'],
      type: 'foreign key',
      name: 'Patterns_size_general_id_foreign',
      references: {
        table: 'Size_generals',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('Patterns', {
      fields: ['color_id'],
      type: 'foreign key',
      name: 'Patterns_color_id_foreign',
      references: {
        table: 'Colors',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'CASCADE'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Products', 'Products_category_id_foreign')
    await queryInterface.removeConstraint('Images', 'Images_product_id_foreign')
    await queryInterface.removeConstraint('Colors', 'Colors_product_id_foreign')
    await queryInterface.removeConstraint('Size_tops', 'Size_tops_product_id_foreign')
    await queryInterface.removeConstraint('Size_bottoms', 'Size_bottoms_product_id_foreign')
    await queryInterface.removeConstraint('Size_skirts', 'Size_skirts_product_id_foreign')
    await queryInterface.removeConstraint('Size_generals', 'Size_generals_product_id_foreign')
    await queryInterface.removeConstraint('Patterns', 'Patterns_product_id_foreign')
    await queryInterface.removeConstraint('Patterns', 'Patterns_size_top_id_foreign')
    await queryInterface.removeConstraint('Patterns', 'Patterns_size_bottom_id_foreign')
    await queryInterface.removeConstraint('Patterns', 'Patterns_size_skirt_id_foreign')
    await queryInterface.removeConstraint('Patterns', 'Patterns_size_general_id_foreign')
    await queryInterface.removeConstraint('Patterns', 'Patterns_color_id_foreign')
  }
};