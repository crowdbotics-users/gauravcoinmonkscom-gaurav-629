var express = require('express');
var router = express.Router();
var async = require('async');
var moment = require('moment');
var path = require('path');
var models = require('../../../server/models');
var sessionHelper = require('../../../server/helpers/session');

var config = require('../../../server/config/config.js');
var request = require('request');

router.get('/portfolio', function(req, res) {
  var userId = sessionHelper.currentUserId(req, res);
  models.portfolio
    .findAll({
      where: {
        userId: userId,
      }
    })
    .then(function(portfolio) {
      if (!portfolio) {
        return res.redirect('/portfolio?err=' + encodeURIComponent('No Coin found'));
      }
      
      res.send({
          portfolio: portfolio
      })
    })
    .catch(function(err) {
      return res.status(400).send(err.errors ? err.errors : err);
    });
});

router.post('/addcoin', function(req, res, next) {
  var userId = sessionHelper.currentUserId(req, res);
  var coinName = req.body.coinName;
  models.portfolio
  .findOne({ where: {coinName: coinName} })
  .then(entry => {
    models.portfolio.create({
      userId : userId, 
      coinName: coinName,
      createdAt: new Date(),
      exchangeId: 1,
      exchangeName:"Bittrex",  
      buyingPrice: req.body.buyingPrice,
      currentPrice :entry.currentPrice
  })
  .then(function(user) {
      //do something here
      res.redirect('/dashboard');
  })
  .catch(function(err) {
    console.error('Failed to add a coin');
    return res.status(400).send(err.errors ? err.errors : err);
  });
  })
  });

  router.post('/deletecoin', function(req, res, next) {
    var userId = sessionHelper.currentUserId(req, res);
    var entry = req.body.entry;
    models.portfolio.destroy({
      where: {
        id: entry
    }
    })
    .then(function(user) {
        //do something here
        console.log("I am trying to delete*********************************");
        res.redirect('/dashboard');
    })
    .catch(function(err) {
      console.error('Failed to add a coin');
      return res.status(400).send(err.errors ? err.errors : err);
    });
  });




module.exports = router;
