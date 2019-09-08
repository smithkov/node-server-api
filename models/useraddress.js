'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserAddress = sequelize.define('UserAddress', {
    name: DataTypes.STRING,
    postCode: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    cityId: DataTypes.INTEGER
  }, {});
  UserAddress.associate = function(models) {
    // associations can be defined here
    UserAddress.belongsTo(models.City);
    UserAddress.belongsTo(models.User);
  };
  return UserAddress;
};
