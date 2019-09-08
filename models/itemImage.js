'use strict';
module.exports = (sequelize, DataTypes) => {
  const ItemImage = sequelize.define('ItemImage', {
    path: DataTypes.STRING,
    itemId: DataTypes.INTEGER
  }, {});
  ItemImage.associate = function(models) {
    // associations can be defined here
    ItemImage.belongsTo(models.Item);
  };
  return ItemImage;
};
