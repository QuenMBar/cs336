
const express = require('express');
const app = express();
const http_status = require('http-status-codes');
const bodyParser = require('body-parser');

const HOST = "localhost";
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/request', function(req, res) {
    console.log("GET");
    res.send("Hello lab 6, this is a get request!");
});

app.post('/request', function(req, res) {
    res.json(req.body);
});

app.put('/request', function(req, res) {
    res.json(req.body);
});

app.delete('/request', function(req, res) {
    res.send("This is a delete request");
});

app.head('/request', function(req, res) {
    res.send("Hello lab 6, this is a head request!");
});

app.get('*', function(req, res) {
    res.sendStatus(http_status.BAD_REQUEST);
});

app.post('/forms', function(req, res) {
    res.send('Hello, form POST!<br>Posted message: <code>'
        + req.body.user_name + '</code> : <code>'
        + req.body.user_mail + '</code> : <code>'
        + req.body.user_message + '</code>');
});

app.listen(PORT, HOST, () => {
    console.log("listening on " + HOST + ":" + PORT + "...");
});

