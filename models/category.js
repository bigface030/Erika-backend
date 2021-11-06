'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product, {
        foreignKey: 'category_id'
      });
    }
  };
  Category.init({
    group: DataTypes.ENUM('top', 'bottom', 'skirt', 'general'),
    name: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Category',
    paranoid: true,
  });
  return Category;
};