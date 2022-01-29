const express = require('express');
bodyParser = require('body-parser');
const app = express();
const port = 3000;

var mongoose = require('mongoose');
var mongoDBHostname = process.env.mongoDBHostname || "localhost";
var mongoDBPort = process.env.mongoDBPort || "27017";
var mongoDBName = process.env.mongoDBName || "MINADZD";
var mongoDBURI = 'mongodb://'+mongoDBHostname+':'+mongoDBPort+"/"+mongoDBName;

mongoose.connect(mongoDBURI, {
    reconnectTries: 10,
    reconnectInterval: 500,
    poolSize: 10,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4,
    useNewUrlParser: true
});

console.log('Connecting to ... ');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var laureatesModel = require('./laureatesModel');
var nobelPrizesModel = require('./nobelPrizeModel');

var dataWarehouse = require('./routes');
dataWarehouse(app);

mongoose.connection.on("open", function(err,conn){
    app.listen(port,function(){
        console.log('Laureates of Nobel Prize API server started out ');
    });
})

mongoose.connection.on("error", function (err, conn) {
    console.error("DB init error " + err);
});
