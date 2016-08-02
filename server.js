var express = require('express');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
var cateringDatabase = require('cateringDatabaseExports.js');
var refreshmentDatabase = require('refreshmentDatabaseExports.js');
var cancelDatabase = require('cancelDatabaseExports.js');

app.use(bodyParser.json({}));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/html', express.static(__dirname + '/html'));

app.get('/', function(request, response) {
	response.sendFile(__dirname + "/")
});

app.post('/catering-form', function(req, res) {
	var data = req.body;

	var info = {
		office : data.office,
		year : data.year,
		shortYear : data.year.toString().charAt(2)+data.year.toString().charAt(3),
		caseType : data.caseType,
		caseNumber : data.caseNumber,
		judge : data.judge,
		email : data.email,	
		toEmail : data.email + '@mad.uscourts.gov',
		phone : data.phone,
		jurors : data.jurors,
		beginDayOfWeek : data.beginDayOfWeek,
		beginMonth : data.beginMonth,
		beginDay : data.beginDay,
		beginYear : data.beginYear,
		endDayOfWeek : data.endDayOfWeek,
		endMonth : data.endMonth,
		endDay : data.endDay,
		endYear : data.endYear,
		foodChoice : data.foodChoice,
		breakfastHour : data.breakfastHour,
		breakfastMinute : data.breakfastMinute,
		breakfastTimezone : data.breakfastTimezone,
		lunchHour : data.lunchHour,
		lunchMinute : data.lunchMinute,
		lunchTimezone : data.lunchTimezone,
		customMinute : data.customMinute,
		customHour : data.customHour,
		customTimezone : data.customTimezone,
		quantity : data.quantity,
		otherItemsNeeded : data.otherItemsNeeded,
		customFood : data.customFood,
		additionalComments : data.additionalComments,
		todaysDate : new Date()
	};

	cateringDatabase.updateDatabase(info);
	res.sendStatus(200)
}); //end post request

app.post('/refreshment-form', function(req, res) {
	var data = req.body;

	var info = {
		quantity : data.quantity,
		dayOfWeek : data.dayOfWeek,
		day : data.day,
		month : data.month,
		year : data.year
	}

	refreshmentDatabase.updateDatabase(info);
});

app.post('/cancel-form', function(req, res) {
	var data = req.body;

	var orderID = data.orderID;
	console.log("ORDER ID: " + orderID);

	cancelDatabase.updateDatabase(orderID, function(isallclear, isduplicate) {
		console.log("SERVER ISALLCLEAR: " + isallclear);
		console.log("SERVER ISDUPLICATE: " + isduplicate);
		res.send({isclear: isallclear, isdup: isduplicate});	
	});

});

console.log("Listening on port 8010");
app.listen(8010);

