'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
    }
  };
  Image.init({
    product_id: DataTypes.INTEGER,
    src: DataTypes.STRING,
    alt: DataTypes.STRING,
    is_main: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Image',
    paranoid: true,
  });
  return Image;
};