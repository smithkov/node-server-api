'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    firstname: DataTypes.STRING,
    surname: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.UserAddress);
    User.belongsTo(models.Role);
    User.hasMany(models.Order);
    User.hasMany(models.Shop);
    User.hasMany(models.FinalOrder);
  };
  return User;
};
