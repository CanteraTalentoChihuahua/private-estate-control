import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json({ limit: '100mb' }));
app.use(cors());

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Endpoints - test

app.get('/endpoint', function (req, res) {

    let usrs = {
        "items": [
            { "id": 1, "name": "Juan" },
            { "id": 2, "name": "John" }
        ]
    }
    
    res.send(usrs);

    console.log('endpoint works');
});

app.get('/ee', (req, res) => {
    //qu = 'SELECT * FROM TEmployee';
    //poolFinal(req, res, qu);
    console.log("db ee early yay");
});

///////////////////////

app.listen(port, () => {
    console.log(`Server running on ${port}`
    )
});