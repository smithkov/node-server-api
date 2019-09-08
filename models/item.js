'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    weight: DataTypes.STRING,
    defaultImg: DataTypes.STRING,
    definition: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    shopId: DataTypes.INTEGER
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    Item.hasMany(models.ItemImage);
    Item.belongsTo(models.Category);
    Item.belongsTo(models.Shop);
  };
  return Item;
};
