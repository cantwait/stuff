var express = require('express');
const http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const WebSocket = require('ws');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

mongoose.connect('mongodb://taxes:taxes@ds053648.mlab.com:53648/heroku_xd6mfl0k', {},(err)=>{
    if(err){
        console.log(err)
    }
});

var users = require('./routes/users');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/users', users);

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
