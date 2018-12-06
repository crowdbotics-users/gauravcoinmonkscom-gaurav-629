'use strict';


module.exports = function(sequelize, DataTypes) {
  var Portfolio = sequelize.define('portfolio', {
    userId : DataTypes.INTEGER, 
    coinName: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    exchangeId: DataTypes.INTEGER,
    exchangeName:DataTypes.STRING,  
    buyingPrice: DataTypes.DECIMAL,
    currentPrice: DataTypes.DECIMAL,
  });

  return Portfolio;
};
