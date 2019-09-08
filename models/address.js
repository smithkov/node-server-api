'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    name: DataTypes.STRING,
    postCode: DataTypes.STRING,
    region: DataTypes.STRING,
    shopId: DataTypes.INTEGER,
    cityId: DataTypes.INTEGER,

  }, {});
  Address.associate = function(models) {
    Address.belongsTo(models.City);
    Address.belongsTo(models.Shop);
    // associations can be defined here
  };
  return Address;
};
