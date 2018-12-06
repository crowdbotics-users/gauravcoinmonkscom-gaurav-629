var express = require('express');
var router = express.Router();
var path = require('path');
var VIEWS_DIR = path.resolve(__dirname, '../client/public/views');
var sessionHelper = require('../server/helpers/session');

module.exports = function(app) {
	// API Routes
	app.use('/api/user', require(path.resolve(__dirname, './api/v1/user.js')));

	app.use('/api/dashboard', require(path.resolve(__dirname, './api/v1/portfolio.js')));

	/* GET home page. */
	app.route('/')
		.get(function (req, res) {
			var currentUser = sessionHelper.currentUserId(req, res);
			if(currentUser != undefined){
				res.redirect("/dashboard");		
			}else{
		  res.sendFile(path.join(VIEWS_DIR, '/index.html'));
			}
		});

		app.route('/dashboard')
		.get(function (req, res) {
			var currentUser = sessionHelper.currentUserId(req, res);
			if(currentUser == undefined){
				res.redirect("/");
			}else{
		  res.sendFile(path.join(VIEWS_DIR, '/dashboard.html'));
			}
		});
		
		app.route('/bitcoin')
		.get(function (req, res) {
				  res.sendFile(path.join(VIEWS_DIR, '/bitcoin.html'));
		});	
		
		app.route('/ethereum')
		.get(function (req, res) {
				  res.sendFile(path.join(VIEWS_DIR, '/ethereum.html'));
		});	
};
