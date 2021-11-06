'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size_top extends Model {
    static associate(models) {
      Size_top.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
      Size_top.hasMany(models.Pattern, {
        foreignKey: 'size_top_id'
      });
    }
  };
  Size_top.init({
    product_id: DataTypes.INTEGER,
    size: DataTypes.STRING,
    sleeve_length: DataTypes.INTEGER,
    body_length: DataTypes.INTEGER,
    body_width: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Size_top',
    paranoid: true,
  });
  return Size_top;
};