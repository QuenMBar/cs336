var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var db;
var password = process.env.MONGO_PASSWORD;
var mongo_connection = "mongodb://cs336:" + password + "@ds213338.mlab.com:13338/people";

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.post('/people', function(req, res) {
    db.collection('people').insertOne({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        id: req.body.id,
        startDate: req.body.startDate,
    })
});

app.post('/getPeople', (req, res) => {
    db.collection('people').find({"id": req.body.id}).toArray(function (err, people) {
        allPeople = people;
        var person = findPerson(req.body.id);
        if (person == "null") {res.send('404')}
        res.send(JSON.stringify(person));
    });
});

app.get('/people/:id/years', function (req, res) {
    db.collection('people').find({"id": req.body.id}).toArray(function (err, people) {
        allPeople = people;
        var personYears = calcAge(req.body.id);
        if (personYears == "null") {res.send('404')}
        res.send(JSON.stringify(personYears));
    });
})

app.get('/people/:id/name', function (req, res) {
    db.collection('people').find({"id": req.body.id}).toArray(function (err, people) {
        allPeople = people;
        var personName = findPersonName(req.body.id);
        if (personName == "null") {res.send('404')}
        res.send(JSON.stringify(personName));
    });

})

app.get('/people/:id', function (req, res) {
    db.collection('people').find({"id": req.body.id}).toArray(function (err, people) {
        allPeople = people;
        var person = findPerson(req.body.id);
        if (person == "null") {res.send('404')}
        res.send(JSON.stringify(person));
    });
})

app.put('/people/:id', function (req, res) {
    db.collection('people').updateMany({id: req.body.id}, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            startDate: req.body.startDate
        }
    })
    res.send("Put Request For ID: " + req.body.id);
})

app.delete('/people/:id', function (req, res) {
    db.collection('people').deleteOne({"id": req.params.id})
    res.send("Delete Request For ID: " + req.body.id);
})

app.get('/people', function (req, res) {
    db.collection('people').find({}).toArray(function (err, people){
        res.json(people);
    });
})

function findPerson(id) {
    for (var i = 0; i < allPeople.length; i++) {
        if (allPeople[i].id == id) {
            return allPeople[i];
        }
    }
    return "null";
}

function findPersonName(id) {
    for (var i = 0; i < allPeople.length; i++) {
        if (allPeople[i].id == id) {
            return allPeople[i].firstName + ' ' + allPeople[i].lastName;
        }
    }
    return "null";
}

let allPeople = [];

function calcAge(id) {
    for (var i = 0; i < allPeople.length; i++) {
        if (allPeople[i].id == id) {
            var today = new Date();
            var birthDate = new Date(allPeople[i].startDate);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }
    }
    return 'null';
}


MongoClient.connect(mongo_connection, function (err, client) {
    if (err) throw err;

    db = client;

    db.collection('people').find().toArray(function (err, result) {
        if (err) throw err;

        console.log(result)
    });

    app.listen(app.get('port'), function() {
        console.log('Server started: http://localhost:' + app.get('port') + '/');
    });
});
