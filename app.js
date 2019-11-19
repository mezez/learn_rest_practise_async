const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');

const app = express();

app.use('/images', express.static(path.join(__dirname, 'images')));

const fileFilter = (req, file, cb) => {

    if (file.mimetype.toLowerCase() === 'image/png' || file.mimetype.toLowerCase() === 'image/jpg' || file.mimetype.toLowerCase() === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //you an replace the wildcard with specifi urls or domains.
    //multiple domains can be seperated with commas
    res.setHeader('Access-Control-Allow-Methods', '*'); //methods can be replaced with POST, PUT, PATCH, DELETE
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.urlencoded({ extended: true })); //for x-www-form-urlencoded (form) data
app.use(bodyParser.json()); //for json data
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')); //image is the input name for a file in edit-product ejs file

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

;

//mongoose.connect('mongodb+srv://mez:incorrect94@learn-zuf6u.mongodb.net/social', {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect('mongodb://localhost/social', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        //app.listen(8080); //commented out because server is need for the socket io function 
        //which requires an http server as an argument
        //console.log("connected");

        // const server = app.listen(8080);

        // //console.log(server);

        // module.exports = server;

        //socketio connection
        //const io = require('./socket').init(server);
        // io.on('connection',socket => { 
        //     //function will be executed for every new client that connects
        //     console.log('client connected');

        // })
    })
    .catch(err => {
        console.log(err);

    });

    const server = app.listen(8080);

    //console.log(server);

    module.exports = server;

