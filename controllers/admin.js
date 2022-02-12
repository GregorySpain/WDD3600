
// export the function that will render the add product view.
// called by admin.js
// import the model
const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
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
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', { pageTitle: 'Admin Products',
        prods: products,
        path: '/admin/products' });
    });
}