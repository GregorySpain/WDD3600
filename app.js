const path = require('path'); // import the path module
const get404 = require('./controllers/error') // import the error controller
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');


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

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
})

app.use('/admin', adminRoutes); // for any requests to the admin folder use the admin route file

app.use(shopRoutes); // for any requests to the shop folder, use the shop route.

// if anything isn't handled above use the 404 page.
// this calls the get404 function in the error controller.
app.use(get404.get404);

// set table associations
// add the userId to the products table in a one to many relationship
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
// add the userId to the Cart table in a one to one relationship
User.hasOne(Cart);
Cart.belongsTo(User);
// create many to many relationship between cart and
// product tables through the cart item table.
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
// create a one to many relation ship between user and orders.
Order.belongsTo(User);
User.hasMany(Order);
// create a many to many relationship between the orders and
// products tables through the orderItems table.
Order.belongsToMany(Product, { through: OrderItem });



sequelize
.sync()
//.sync({force: true})
.then(result => {
    return User.findByPk(1);
}).then(user => {
    if (!user) {
        return User.create({ name: 'Greg', email: 'Test@test.com'})
    }
    return user
}).then(user => {
    return user.createCart();
    //console.log(user)
}
).then(cart => {
    app.listen(3000);     // start listening on the port passed.

})    
.catch(err => console.log(err));

