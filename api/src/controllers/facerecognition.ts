// import { request } from "express";
import fs from "fs";
import jquerrt from "jquery";
import request from "request";

export const facerecognition = (req: any, res: any) => {

    var options = {
        method: 'POST',
        url: "https://api.luxand.cloud/photo/search",
        qs: {},
        headers: {
            'token': "33d74a6b5df94fce8266311271686c45"
        },
        formData: {
            //photo: fs.createReadStream('photo.jpg') 
            // or use URL 
            photo: 'https://dashboard.luxand.cloud/img/brad.jpg'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
}

export const listpersons = (req: any, res: any) => {
    var request = require("request");

    var options = {
        method: 'GET',
        url: "https://api.luxand.cloud/subject",
        qs: {},
        headers: {
            'token': "33d74a6b5df94fce8266311271686c45"
        }
    };

    request(options, function (error: any, response: any, body: any) {
        if (error) throw new Error(error);

        console.log(body);

        res.send(body)
    });
}

export const deleteallpersons = (req: any, res: any) => {
    var request = require("request");

    var options = {
        method: 'DELETE',
        url: "https://api.luxand.cloud/subject",
        qs: {},
        headers: {
            'token': "33d74a6b5df94fce8266311271686c45"
        }
    };

    request(options, function (error: any, response: any, body: any) {
        if (error) throw new Error(error);

        console.log(body);
    });
}

export const createFaceID = (req: any, res: any) => {

    // var options = {
    //     method: 'POST',
    //     url: "https://api.luxand.cloud/subject/v2",
    //     qs: { "name": "NAME", "store": "1" },
    //     headers: {
    //         'token': "33d74a6b5df94fce8266311271686c45"
    //     },
    //     formData: {
    //         photo: fs.createReadStream('photo.jpg')
    //         // or use URL 
    //         // photo: 'https://dashboard.luxand.cloud/img/brad.jpg' 
    //     }
    // };

    // request(options, function (error, response, body) {
    //     if (error) throw new Error(error);

    //     console.log(body);
    // });

    res.send(`
    <html>
        <body>

        <h1>An Image</h1>

        <img src=req.body.img alt="image">

        </body>
    </html>
    `);

}

export const faceId = (req: any, res: any) => {

    res.send(`
    <html>
        <body>

        <h1>The input accept attribute </h1>

        <form method="POST" action="/facerecognition/createFace">
            Email: <input type="text" name="email" id="email"><br>
            <label for= "img"> Select image: </label>
            <input type = "file" id = "img" name = "img" accept = "image/*"><br>
            <input type="submit">
        </form>

        </body>
    </html>
    `);

}