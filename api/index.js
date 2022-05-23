const express = require('express');
//const mongoose = require('mongoose');

const cors = require('cors');

const app = express();
const port = 2000;

app.use(express.json({ limit: '100mb' }));
app.use(cors());

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

main().catch(err => console.log(err));

// Console err cuz no db existent lol
//async function main() {
//    await mongoose.connect('mongodb://localhost27017/ResidentialDev');
//}

/*
const usersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    emailAddress: String,
    password: String,
    activeObject: Boolean
});

//module.exports = mongoose.model("Users", usersSchema);

const Thing = mongoose.model("Users", usersSchema);

const m = new Thing;
m.firstName = "John";
m.lastName = "Johnson";
m.phoneNumber = "6141234567";
m.emailAddress = "yes@a.com";
m.password = "password1";
m.activeObject = true;
*/

app.get('/endpoint', function (req, res) {

    let usrs = {
        "items": [
            { "id": 1, "name": "Juan" },
            { "id": 2, "name": "John" },
            //{ "id": 3, "name": m.lastName }
        ]
    }


    res.send(
        usrs
    );
    console.log('endpoint works');
});

app.listen(port, function () {
    console.log(`Server running on ${port}`
    )
});