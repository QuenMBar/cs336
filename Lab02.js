function person(name, birthday, friends) {
    this.myName = name;
    this.myBirthday = birthday;
    this.myFriends = friends;
    console.log("Person created: ", this.myName, " ", this.myBirthday, " ", this.myFriends)
}

person.prototype.newName = function (newName) {
    this.myName = newName;
    console.log("Your name is now ", this.myName)
}

person.prototype.calcAge = function () {
    var today = new Date();
    var birthDate = new Date(this.myBirthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

person.prototype.addFriend = function (newFriend) {
    this.myFriends.push(newFriend);
    console.log("Your friends are now: ", this.myFriends);
}

person.prototype.greeting = function () {
    console.log("Hello, my name is ", this.myName);
}

let testPerson1 = new person("Jim Sterling", "10/21/1958", ["Jim", "Sally"]);
testPerson1.newName("Not Jim");
let calculatedAge = testPerson1.calcAge();
console.log("Your age is ", calculatedAge);
testPerson1.addFriend("Samantha");
testPerson1.greeting();

let testPerson2 = new person("John Sivers", "3/21/1998", ["Josh", "Sally", "Ron", "Tiffiny"]);
testPerson2.greeting();
testPerson2.addFriend("Nott");
testPerson2.newName("Toby");
console.log(testPerson2.calcAge() >= testPerson1.calcAge());

function child(name, birthday, friends, subject) {
    person.call(name, birthday, friends);
    this.mySubject = subject;
}

child.prototype = Object.create(person.prototype);

child.prototype.greeting = function () {
    console.log("Hello, my name is ", this.myName, " and i study ", this.mySubject);
}

let testChild = new child("Sally Marcer", "8/13/2001", ["Josh", "Sally", "Ron", "Tiffiny"]);
testChild.calcAge();
testChild.greeting();
testPerson2.addFriend("Nott");
testPerson2.newName("Saly Purcer");

console.log(testChild instanceof child);
console.log(testChild instanceof person);
console.log(testChild instanceof Object);