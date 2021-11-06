'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate(models) {
      Color.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
      Color.hasMany(models.Pattern, {
        foreignKey: 'color_id'
      });
    }
  };
  Color.init({
    product_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Color',
    paranoid: true,
  });
  return Color;
};