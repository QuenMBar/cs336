
const express = require('express');
const app = express();
const http_status = require('http-status-codes');
const bodyParser = require('body-parser');
var path = require('path');

const HOST = "localhost";
const PORT = 3000;

app.use('/', express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/hello', function(req, res) {
    res.json("Hello, Lab07!");
});

app.listen(PORT, HOST, () => {
    console.log("listening on " + HOST + ":" + PORT + "...");
});