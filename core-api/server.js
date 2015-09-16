var express = require('express'),
    app = express();

// Routes
app.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8000");
    res.header("Access-Control-Allow-Methods", "GET");
    res.send('Server is running');
});

// Port
app.listen(4000, function() {
    console.log('Server running on: 4000');    
});