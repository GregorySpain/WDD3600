const path = require('path'); // import the path module
const get404 = require('./controllers/error') // import the error controller

const express = require('express'); // import express
const bodyParser = require('body-parser'); // import body-parser

const app = express(); // this  returns an express object

app.set('view engine', 'ejs'); // set the view engine to ejs
app.set('views', 'views'); // set the folder containing the views. Second param is the folder

const adminRoutes = require('./routes/admin'); // import the admin route file
const shopRoutes = require('./routes/shop'); // import the shop route

app.use(bodyParser.urlencoded({extended: false})); // 

// for serving static files.path.join adds each param as a directory path
// but in a way that allows cross platform use
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes); // for any requests to the admin folder use the admin route file

app.use(shopRoutes); // for any requests to the shop folder, use the shop route.

// if anything isn't handled above use the 404 page.
// this calls the get404 function in the error controller.
app.use(get404.get404);

app.listen(3000); // start listening on the port passed.