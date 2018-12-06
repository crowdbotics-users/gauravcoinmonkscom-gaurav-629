var cron = require('node-cron');
var models = require('../models');
var request = require('request');
var async = require('async');


var job = function registerCron(){
    console.log("registering cron");
    cron.schedule('* * * * *', () => {
        console.log('running every minute to 1');
        try{
        updatePrice()
        }catch(e){
            console.log("error while running cron")
        }
      });      
}



function updatePrice(){
    updateBitcoinPrice()
    upadateEthereumPrice();
}


function updateBitcoinPrice(){
    var url = "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD"
    request(url, function (error, response, body) {
    body = JSON.parse(body);
updateDb('Bitcoin' , body["USD"] );
});
}

function upadateEthereumPrice(){
  var url = "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
  request(url, function (error, response, body) {
  body = JSON.parse(body);
  updateDb('Ethereum' , body["USD"]);
  });
}


function updateDb(currencyName, price){
    models.portfolio.update(
        {currentPrice:  price},
        {where: {coinName : currencyName}}
      )
      .then(function(rowsUpdated) {
        console.log(rowsUpdated)
      })
      .catch(function(error){
        console.log("There is a error");
      })

    }

module.exports.registerCron = job; 
