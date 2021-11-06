'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size_skirt extends Model {
    static associate(models) {
      Size_skirt.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
      Size_skirt.hasMany(models.Pattern, {
        foreignKey: 'size_skirt_id'
      });
    }
  };
  Size_skirt.init({
    product_id: DataTypes.INTEGER,
    size: DataTypes.STRING,
    waist: DataTypes.STRING,
    hip: DataTypes.INTEGER,
    length: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Size_skirt',
    paranoid: true,
  });
  return Size_skirt;
};