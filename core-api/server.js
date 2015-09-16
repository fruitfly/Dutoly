var express = require('express'),
    app = express(),
    config = require('./config/development.js'),
    request = require('request');

app.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8000");
    res.header("Access-Control-Allow-Methods", "GET");
    res.send('Server is running');
});

app.get('/10k/:ticker/:year', function(req, res) {
    console.log(req.params);
    res.header("Access-Control-Allow-Origin", "http://localhost:8000");
    res.header("Access-Control-Allow-Methods", "GET");
    var ticker = req.params.ticker,
        year = req.params.year,
        apiKey = config.apiKey,
        options = {
            url: 'http://sec.kimonolabs.com/companies/' + ticker + '/forms/10-K/ANN/' + year + '?apiKey=' + apiKey
        };

        request(options, function(err, response, body) {
            console.log(body);
            res.send(200, body);
        });
});

// Port
app.listen(4000, function() {
    console.log('Server running on: 4000');
});