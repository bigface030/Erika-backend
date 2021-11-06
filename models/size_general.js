'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size_general extends Model {
    static associate(models) {
      Size_general.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
      Size_general.hasMany(models.Pattern, {
        foreignKey: 'size_general_id'
      });
    }
  };
  Size_general.init({
    product_id: DataTypes.INTEGER,
    size: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Size_general',
    paranoid: true,
  });
  return Size_general;
};