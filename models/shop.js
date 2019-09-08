'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('Shop', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    logo: DataTypes.STRING,
    banner: DataTypes.STRING,
    shopTypeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Shop.associate = function(models) {
    // associations can be defined here
    Shop.belongsTo(models.ShopType);
    Shop.belongsTo(models.User);
    Shop.hasMany(models.Item);
    Shop.hasOne(models.Address);

  };
  return Shop;
};
