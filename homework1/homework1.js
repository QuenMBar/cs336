const express = require('express')
const app = express()
const port = 3000

function people(firstName, lastName, loginID, startDate) {
    this.myfirstName = firstName;
    this.mylastName = lastName;
    this.myloginID = loginID;
    this.mystartDate = startDate;
}

var allPeople = [
    new people("Jim", "Sterling", "JS37", "10/24/1956"),
    new people("Sara", "Jane", "SJ21", "10/24/1956"),
    new people("Ozzy", "Winger", "OW02", "10/24/1956"),
    new people("Lola", "Griff", "LG15", "10/24/1956"),
    new people("Dona", "Fitzroy", "DF05", "10/24/1956"),
    new people("Hank", "Grag", "HG01", "10/24/1956"),
    new people("Harry", "Silvers", "HS06", "10/24/1956"),
    new people("Kathy", "James", "KJ49", "10/24/1956"),
    new people("Greg", "Harp", "GH68", "10/24/1956"),
    new people("John", "Jackob", "JJ00", "10/24/1956"),
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
    for (i = 0; i < 10; i++) {
        if (allPeople[i].myloginID == req.params.id) {
            break;
        } else {
            j++
        }
    }
    if (j == 10) {res.send(404)} else{
        res.json(allPeople[i].myloginID + ": " + allPeople[i].myfirstName + " " + allPeople[i].mylastName + ": started " + allPeople[i].mystartDate)
    }
})

app.get('/people', function (req, res) {
    var i;
    let textNames = "|| ";
    for (i = 0; i < 10; i++) {
        textNames = textNames + allPeople[i].getName() + "||";
    }
    res.json(textNames)
})






app.listen(port, () => console.log(`Example app listening on port ${port}!`))