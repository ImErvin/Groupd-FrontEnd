// Call the packages needed
var express = require('express');
var app = express();
var path = require('path');

// set the port
var port = process.env.PORT || 5000; // sets the port

// uses resources found in the 'static' folder
app.use('/static',  express.static( path.join(__dirname, '/static')));

app.get('/', function(req, res){
        res.sendfile(path.join(__dirname + '/static/index.html')); 
});


// START THE SERVER
// =================================================================
app.listen(port);
console.log('Connected to Port ' + port);