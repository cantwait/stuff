var express = require('express');
require('dotenv').config();
const http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const WebSocket = require('ws');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_URL}`, {},(err)=>{
    if(err){
        console.log(err)
    }
});

//Routers
var users = require('./routes/users');
const containers = require('./routes/containers');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/users', users);
app.use('/api/v1/containers', containers);

server.on('request', app);

wss.on('connection', (ws,req,res)=>{
    console.log('connected!');

    ws.on('message',(msg)=>{
        console.log(msg);
    })
})

wss.on('closed', (ws)=>{
    console.log('closed');
})



server.listen(3000, function listening() {
    console.log('Listening on %d', server.address().port);
});

module.exports = app;
