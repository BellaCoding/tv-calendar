var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// var logger = function(req, res, next){
//     console.log('Logging...');
//     next();
// }

// app.use(logger);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.send('Hello Worldddddd');
})

const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log(`Listening on port ${port}...`);
})