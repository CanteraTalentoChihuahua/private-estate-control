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

app.get('/test', function (req, res) {

    let nameVar = "Javi"

    res.json({name: nameVar});
    console.log('endpoint works');
});

app.get('/endpoint', function (req, res) {

    let users = {
        "items": [
            {id:"1",username:"Arnold",lastname:"Valdez",phoneNumber:"6141909090",email:"tut@tut.tut",active:1},
            {id:"2",username:"Nono",lastname:"Valdez",phoneNumber:"6141234567",email:"tut@tut.tut",active:0}
            //{ "id": 3, "name": m.lastName }
        ]
    }


    res.send(
        users
    );
    console.log('endpoint works');
});

app.listen(port, function () {
    console.log(`Server running on ${port}`
    )
});