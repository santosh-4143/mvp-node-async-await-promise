var express = require('express');
var multer = require('multer');

var request = require('request');


var config = require('./config.js');
var utils = require('./utils.js');
app = express();
port = process.env.PORT || config.PORT;

var http = require('http').Server(app);


var mapiRouter = require('./routes/mapi');
var webRouter = require('./routes/webapi');


var cors = require('cors');
var bodyParser = require('body-parser');
app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/mapi/v1', mapiRouter);
app.use('/webapi/v1', webRouter);

// var Storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, uploadPath);
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//     }
// });

// var upload = multer({
//     storage: Storage
// }).array("imgUploader", 3); //Field name and max count 

// app.post("/v1/upload", function (req, res) {
//     console.log("upload API");
//     var filename = null;
//     upload(req, res, function (err) {
//         if (err) {
//             return res.end("Something went wrong!");
//         }
//         var files = req.files;
//         if (files.length > 0) {
//             var file = files[0];
//             console.log(file.filename)
//             filename = file.filename
//             res.json({"error": 0, "errorCode": 0, "imageUrl": imageUrl+filename});
//         } else {
//             res.json({"error": 1, "errorCode": 100, "errorMessage": "Image not uploded"});
//         }


//     })
// });








// app.get() problems


app.listen(port);
console.log('todo list RESTful API server started on: ' + port);


