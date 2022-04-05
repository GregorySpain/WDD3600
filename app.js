const path = require('path'); // import the path module
const get404 = require('./controllers/error') // import the error controller
const User = require('./models/user');

const express = require('express'); // import express
const bodyParser = require('body-parser'); // import body-parser
const mongoose = require('mongoose'); // import mongoose

const app = express(); // this  returns an express object

app.set('view engine', 'ejs'); // set the view engine to ejs
app.set('views', 'views'); // set the folder containing the views. Second param is the folder

const adminRoutes = require('./routes/admin'); // import the admin route file
const shopRoutes = require('./routes/shop'); // import the shop route

app.use(bodyParser.urlencoded({extended: false})); // 

// for serving static files.path.join adds each param as a directory path
// but in a way that allows cross platform use
app.use(express.static(path.join(__dirname, 'public')));

// create a user and attach it to the request as req.user
app.use((req, res, next) => {
    User.findById('624ba3dc6818fe55c78ae9cd') // pass the user id to the findById function
    .then(user => { // then attach the data from the returned user to a new user object
        req.user = user; // attach the user to the req
        next(); // call next so it is applied to all routes
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes); // for any requests to the admin folder use the admin route file

app.use(shopRoutes); // for any requests to the shop folder, use the shop route.

// if anything isn't handled above use the 404 page.
// this calls the get404 function in the error controller.
app.use(get404.get404);


mongoose.connect('mongodb+srv://root:MyoyQ4MsFrV8rt1u@cluster0.ad8ew.mongodb.net/shop?retryWrites=true&w=majority')
.then(result => {
    User.findOne().then(user => {
        if (!user) {
            const user = new User({
                name: 'Greg',
                email: 'test@test.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    })
    app.listen(3000);
}).catch(err => {
    console.log(err);
})



