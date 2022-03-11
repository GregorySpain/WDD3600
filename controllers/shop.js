/**
    This is the controller for returning and rendering product data as responses.
    It gets data from the model, then passes it to the calling view. Each function
    is a callback function executed by the routers.
*/

// import the model
const Product = require('../models/product');



// export function to to display products called by /products route
exports.getProducts = (req, res, next) => {
    Product.fetchAll() // .fetchAll returns the products as an array and a promise
    .then(products => { // render page passing the product array
        res.render('shop/product-list', 
        { pageTitle: 'All Products',
        prods: products,
        path: '/products' 
        });
    })
    .catch(err => console.log(err));
}

// function to get product details
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId; // product id is passed as a param on the request
    Product.findById(prodId) // returns product as a promise
    .then((product) => { // render page passing the product to the page
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
    })
    .catch(err => console.log(err));
}

// same as getProducts but called by default / route
exports.getIndex = (req, res, next) => {
    Product.fetchAll()
    .then(products => {
        res.render('shop/index', {
            pageTitle: 'My Shop',
            prods: products,
            path: '/'
        });
    })
    .catch(err => console.log(err));
}

// method to get cart from shop routes
exports.getCart = (req, res, next) => {
    req.user.getCart() // call getCart method of user object
        .then(products => { // then render the page
            res.render('shop/cart', {
            pageTitle: 'Your Cart',
            path: '/cart',
            products: products  
            })
        })    
    .catch(err => console.log(err));
}

// add items to cart called by shop routes
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId) // find the item
    .then(product => {// then call the addToCart method of the user object
        return req.user.addToCart(product);
    }).then(result => { // then redirect
        console.log(result);
        res.redirect('/cart');
    })
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.deleteItemFromCart(prodId)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err))

}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
}

exports.postOrder = (req, res, next) => {
    req.user
    .addOrder()
    .then(result => {
        res.redirect('/orders')
    })
    .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
    req.user.getOrders()
    .then(orders => {
        res.render('shop/orders', {
            pageTitle: 'Your Orders',
            path: '/orders',
            orders: orders
        });

    })
    .catch(err => console.log(err));
}