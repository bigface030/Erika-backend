'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
    }
  };
  Product.init({
    gender: DataTypes.ENUM,
    category_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    material: DataTypes.STRING,
    washing: DataTypes.STRING,
    is_deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};