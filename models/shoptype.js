'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShopType = sequelize.define('ShopType', {
    name: DataTypes.STRING
  }, {});
  ShopType.associate = function(models) {
    // associations can be defined here
    ShopType.hasMany(models.Shop);
  };
  return ShopType;
};
