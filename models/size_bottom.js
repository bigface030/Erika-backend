'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size_bottom extends Model {
    static associate(models) {
      Size_bottom.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
      Size_bottom.hasMany(models.Pattern, {
        foreignKey: 'size_bottom_id'
      });
    }
  };
  Size_bottom.init({
    product_id: DataTypes.INTEGER,
    size: DataTypes.STRING,
    waist: DataTypes.STRING,
    hip: DataTypes.INTEGER,
    rise: DataTypes.INTEGER,
    inseam: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Size_bottom',
    paranoid: true,
  });
  return Size_bottom;
};