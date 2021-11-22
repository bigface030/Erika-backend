'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pattern extends Model {
    static associate(models) {
      Pattern.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
      Pattern.belongsTo(models.Size_top, {
        foreignKey: 'size_top_id'
      });
      Pattern.belongsTo(models.Size_bottom, {
        foreignKey: 'size_bottom_id'
      });
      Pattern.belongsTo(models.Size_skirt, {
        foreignKey: 'size_skirt_id'
      });
      Pattern.belongsTo(models.Size_general, {
        foreignKey: 'size_general_id'
      });
      Pattern.belongsTo(models.Color, {
        foreignKey: 'color_id'
      });
    }
  };
  Pattern.init({
    product_id: DataTypes.INTEGER,
    size_top_id: DataTypes.INTEGER,
    size_bottom_id: DataTypes.INTEGER,
    size_skirt_id: DataTypes.INTEGER,
    size_general_id: DataTypes.INTEGER,
    color_id: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Pattern',
    paranoid: true,
  });
  return Pattern;
};