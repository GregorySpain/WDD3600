const path = require('path'); // import the path module
const errorController = require('./controllers/error') // import the error controller
const User = require('./models/user');

const shopController = require('./controllers/shop');
const isAuth = require('./middleware/is-auth');

const express = require('express'); // import express
const bodyParser = require('body-parser'); // import body-parser
const mongoose = require('mongoose'); // import mongoose
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer')

const MONGODB_URI = 'Enter your MongoDB Connection URI here'; // Enter your MongoDB URI Here

const app = express(); // this  returns an express object

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

const crsfProtection = csrf();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    } 
};

app.set('view engine', 'ejs'); // set the view engine to ejs
app.set('views', 'views'); // set the folder containing the views. Second param is the folder

const adminRoutes = require('./routes/admin'); // import the admin route file
const shopRoutes = require('./routes/shop'); // import the shop route
const authRoutes = require('./routes/auth'); // import the shop route

app.use(bodyParser.urlencoded({extended: false})); // 
app.use(multer({storage: fileStorage, fileFilter: fileFilter }).single('image'));

// for serving static files.path.join adds each param as a directory path
// but in a way that allows cross platform use
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store }))


app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
});

// create a user and attach it to the request as req.user
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id) // pass the user id to the findById function
    .then(user => { // then attach the data from the returned user to a new user object
        if (!user) {
            return next();
        }
        req.user = user; // attach the user to the req
        next(); // call next so it is applied to all routes
    })
    .catch(err => {
        next(new Error(err));
    });
});

app.post('/create-order', isAuth, shopController.postOrder);

app.use(crsfProtection);
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use('/admin', adminRoutes); // for any requests to the admin folder use the admin route file

app.use(shopRoutes); // for any requests to the shop folder, use the shop route.
app.use(authRoutes);

app.get('/500', errorController.get500);
// if anything isn't handled above use the 404 page.
// this calls the get404 function in the error controller.
app.use(errorController.get404);

app.use((error, req, res, next) => {
    res.status(500).render('500', {
        pageTitle: 'Error!',
        path: '/500',
        isAuthenticated: req.session.isLoggedIn
      });
})

mongoose.connect(MONGODB_URI)
.then(result => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
})