'use strict';
module.exports = (sequelize, DataTypes) => {
  const FinalOrder = sequelize.define('FinalOrder', {
    sum: DataTypes.DECIMAL,
    receiptId: DataTypes.STRING,
    refId: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  FinalOrder.associate = function(models) {
    // associations can be defined here
    FinalOrder.belongsTo(models.User);
  };
  return FinalOrder;
};
