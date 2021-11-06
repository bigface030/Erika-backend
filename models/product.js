'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: 'category_id'
      });
      Product.hasMany(models.Image, {
        foreignKey: 'product_id'
      });
      Product.hasMany(models.Color, {
        foreignKey: 'product_id'
      });
      Product.hasMany(models.Size_top, {
        foreignKey: 'product_id'
      });
      Product.hasMany(models.Size_bottom, {
        foreignKey: 'product_id'
      });
      Product.hasMany(models.Size_skirt, {
        foreignKey: 'product_id'
      });
      Product.hasMany(models.Size_general, {
        foreignKey: 'product_id'
      });
      Product.hasMany(models.Pattern, {
        foreignKey: 'product_id'
      });
    }
  };
  Product.init({
    gender: DataTypes.ENUM('M', 'F', 'G'),
    category_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    material: DataTypes.STRING,
    washing: DataTypes.STRING,
    sold: DataTypes.INTEGER,
    price_standard: DataTypes.INTEGER,
    price_sale: DataTypes.INTEGER,
    is_on: DataTypes.BOOLEAN,
    is_sale: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Product',
    paranoid: true,
  });
  return Product;
};