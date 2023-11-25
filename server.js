/*
Put content of angular2 build into 'public' folder.
*/
const html = './dist/angular12/';

const port = 4812;
// Express
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
var app = express();

app
    .use(compression())
    .use(bodyParser.json())
    // Static content
    .use(express.static(html))
    // Default route
    .use(function (req, res) {
        res.sendFile(__dirname + '/dist/angular12/index.html');
    })
    // Start server
    .listen(port, function () {
        console.log('Port: ' + port);
        console.log('Html: ' + html);
    });