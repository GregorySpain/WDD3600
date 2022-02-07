/**
    This is the controller for returning and rendering product data as responses.
    It gets data from the model, then passes it to the calling view. Each function
    is a callback function executed by the routers.
*/

// import the model
const Product = require('../models/product')

// export the function that will render the add product view.
// called by admin.js
exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
}

// export the function that will execute on a post request.
// this will get the product title and pass it as an parameter 
// to create a Product object, then calls the save() method on that
// object to store the title in the products.json
// file, then redirect the user to the homepage.
// called by admin.js
exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

// export function to to display products.
// It calls the static fetchAll() function of the Product class to get data
// from the products.json file then render the view.
// called by the shop router in shop.js.
exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop', { pageTitle: 'My Shop',
        prods: products,
        path: '/' });
    });
    
}