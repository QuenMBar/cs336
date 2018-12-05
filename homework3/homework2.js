const express = require('express');
const app = express();
const port = 3000;
const HOST = "localhost";
const http_status = require('http-status-codes');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function people(firstName, lastName, loginID, startDate) {
    this.myfirstName = firstName;
    this.mylastName = lastName;
    this.myloginID = loginID;
    this.mystartDate = startDate;
}

let allPeople = [
    new people("Jim", "Sterling", "JS37", "7/23/1982"),
    new people("Sara", "Jane", "SJ21", "4/15/1998"),
    new people("Ozzy", "Winger", "OW02", "12/24/1956"),
    new people("Lola", "Griff", "LG15", "1/05/2010"),
    new people("Dona", "Fitzroy", "DF05", "8/27/1976"),
    new people("Hank", "Grag", "HG01", "5/18/1982"),
    new people("Harry", "Silvers", "HS06", "9/12/2000"),
    new people("Kathy", "James", "KJ49", "3/25/1999"),
    new people("Greg", "Harp", "GH68", "9/03/1967"),
    new people("John", "Jackob", "JJ00", "11/13/1943")
];

people.prototype.getName = function () {
    return (this.myfirstName + " " + this.mylastName + ": " + this.myloginID )
}

people.prototype.calcAge = function () {
    var today = new Date();
    var birthDate = new Date(this.mystartDate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

app.post('/people', function(req, res) {
    console.log("posting");

    for (var i = 0; i < allPeople.length; i++) {
        if (allPeople[i].myloginID == req.body.idNum) {
            res.send( {'content': 'ID already exists'} );
            return;
        }
    }
    allPeople.push(new people(req.body.firstName, req.body.lastName, req.body.idNum, req.body.startDate));
    console.log(allPeople);
    console.log("New person added" + req.body.firstName + req.body.lastName + req.body.idNum + req.body.startDate);
    res.sendStatus(http_status.ACCEPTED);
});

app.post('/getPeople', (req, res) => {
    console.log("Get Person");
    var id = req.body.getId;
    var i;
    var j = 0;
    for (i = 0; i < allPeople.length; i++) {
        if (allPeople[i].myloginID == id) {
            break;
        } else {
            j++
        }
    }
    if (j == allPeople.length) {res.send(404)} else{
        res.send({
            "person": JSON.stringify(allPeople[i])
        });
    }
});

app.get('/people/:id/years', function (req, res) {
    var i;
    var j = 0;
    for (i = 0; i < 10; i++) {
        if (allPeople[i].myloginID == req.params.id) {
            break;
        } else {
            j++
        }
    }
    if (j == 10) {res.send(404)} else{

        res.json(allPeople[i].myfirstName + " has worked here for " + allPeople[i].calcAge() + " years, starting in " + allPeople[i].mystartDate + ".")
    }
})

app.get('/people/:id/name', function (req, res) {
    var i;
    var j = 0;
    for (i = 0; i < 10; i++) {
        if (allPeople[i].myloginID == req.params.id) {
            break;
        } else {
            j++
        }
    }
    if (j == 10) {res.send(404)} else{
        res.json(allPeople[i].myfirstName + " " + allPeople[i].mylastName)
    }
})

app.get('/people/:id', function (req, res) {
    var i;
    var j = 0;
    for (i = 0; i < allPeople.length; i++) {
        if (allPeople[i].myloginID == req.params.id) {
            break;
        } else {
            j++
        }
    }
    if (j == allPeople.length) {res.send(404)} else{
        res.json(allPeople[i])
    }
})

app.put('/people/:id', function (req, res) {
    var i;
    var j = 0;
    for (i = 0; i < allPeople.length; i++) {
        if (allPeople[i].myloginID == req.params.id) {
            break;
        } else {
            j++
        }
    }
    if (j == allPeople.length) {res.send(404)} else{
        allPeople[i].myloginID = req.body.id;
        allPeople[i].myfirstName = req.body.firstName;
        allPeople[i].mylastName = req.body.lastName;
        allPeople[i].mystartDate = req.body.startDate;
        res.json(allPeople[i])
    }
})

app.delete('/people/:id', function (req, res) {
    var i;
    var j = 0;
    for (i = 0; i < allPeople.length; i++) {
        if (allPeople[i].myloginID == req.params.id) {
            break;
        } else {
            j++
        }
    }
    if (j == allPeople.length) {res.send(404)} else{
        delete allPeople[i];
    }
})

app.get('/people', function (req, res) {
    var i;
    let textNames = "|| ";
    for (i = 0; i < 10; i++) {
        textNames = textNames + allPeople[i].getName() + " || ";
    }
    res.json(allPeople)
})






app.listen(port, () => console.log(`Example app listening on port ${port}!`))
