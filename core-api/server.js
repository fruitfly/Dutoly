var express = require('express'),
    app = express(),
    config = require('./config/development.js'),
    request = require('request'),
    async = require('async');

app.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8000");
    res.header("Access-Control-Allow-Methods", "GET");
    res.send('Server is running');
});

// Kimono
app.get('/10k/:ticker/:year', function(req, res) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8000");
    res.header("Access-Control-Allow-Methods", "GET");
    var ticker = req.params.ticker,
        year = req.params.year,
        apiKey = config.apiKey;

    async.parallel({
        year1: function(callback) {
            var year1endpoint = {url: 'http://sec.kimonolabs.com/companies/' + ticker + '/forms/10-K/ANN/' + year + '?apiKey=' + apiKey};
            request(year1endpoint, function(err, response, body) {
                callback(err, JSON.parse(body)[0]);
            });
        },
        year2: function(callback) {
            var year2endpoint = {url: 'http://sec.kimonolabs.com/companies/' + ticker + '/forms/10-K/ANN/' + (year - 1) + '?apiKey=' + apiKey};
            request(year2endpoint, function(err, response, body) {
                callback(err, JSON.parse(body)[0]);
            });
        },
        year3: function(callback) {
            var year3endpoint = {url: 'http://sec.kimonolabs.com/companies/' + ticker + '/forms/10-K/ANN/' + (year - 2) + '?apiKey=' + apiKey};
            request(year3endpoint, function(err, response, body) {
                callback(err, JSON.parse(body)[0]);
            });
        }
    }, function(err, result) {
        if (err) {
            res.send(400, err);
        } else {
            res.send(200, result);
        }
    });
});

// YQL

app.get('/yql', function(req, res) {
    var YQL = require('yql');
    var query = new YQL('SHOW TABLES');
    query.exec(function (error, response) {
        console.log(response.query.results.table);
        res.send(200);
        // Do something with results (response.query.results)
    });

    /*var consumerKey = config.consumerKey;
    var yqlendpoint = {url: 'http://query.yahooapis.com/v1/yql', consumerKey: consumerKey};
    request(yqlendpoint, function(err, response, body) {
        res.send(200, body);
    });*/
});

// Port
app.listen(4000, function() {
    console.log('Server running on: 4000');
});