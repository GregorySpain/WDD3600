/**
    This is the controller for returning and rendering product data as responses.
    It gets data from the model, then passes it to the calling view. Each function
    is a callback function executed by the routers.
*/

// import the model
const Product = require('../models/product')



// export function to to display products.
// It calls the static fetchAll() function of the Product class to get data
// from the products.json file then render the view.
// called by the shop router in shop.js.
exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', { pageTitle: 'All Products',
        prods: products,
        path: '/products' });
    });
    
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', { pageTitle: 'My Shop',
        prods: products,
        path: '/' });
    });
}
exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart'
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders'
    });
}