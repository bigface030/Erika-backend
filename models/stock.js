'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    static associate(models) {
      Stock.belongsTo(models.Pattern, {
        foreignKey: 'pattern_id'
      });
    }
  };
  Stock.init({
    pattern_id: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    type: DataTypes.ENUM('上架', '下架', '售出', '退回'),
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};