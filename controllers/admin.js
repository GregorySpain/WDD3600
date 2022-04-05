

// export the function that will render the add product view.
// called by admin.js
// import the model
const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
}

// function to add product, called by post route from admin routes file
exports.postAddProduct = (req, res, next) => {
    // get data from the request body and create a new product object with it.
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
    });
    
    // call the save method of the product object
    product
    .save()
    .then(result => { // then redirect to the products page
        console.log('Created Product'); // log confirmation message
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
    
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit; // edit is a boolean stored as a query string on the url
    if (!editMode) { // if false simply redirect to the home page
       return res.redirect('/');
    }
    const prodId = req.params.productId // get the product id from the url
    Product.findById(prodId) // returns product as a promise
    .then(product => {
        if (!product) { // if no product is returned redirect to the homepage
            return res.redirect('/')
        }
        res.render('admin/edit-product', { // else render the page
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode, // used in if statements in view
            product: product
        });

    });
}

exports.postEditProduct = (req, res, next) => {
    // get data from request body and use it to create a new
    // product object
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    
    Product.findById(prodId)
    .then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDescription;
        product.imageUrl = updatedImageUrl;
        return product.save();
    })    
    // save the new data then redirect to the admin/products page
    .then(result => {
        console.log('Updated Product')
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err))
}

// method to get all products from admin routes
exports.getProducts = (req, res, next) => {
    Product.find() // get all products
    .then(products => { // then render the page passing the products
        res.render('admin/products', { pageTitle: 'Admin Products',
        prods: products,
        path: '/admin/products' });
    })
    .catch(err => console.log(err));
}

// method to delete a product from admin routes
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId; // get product id from request body
    Product.findByIdAndRemove(prodId) // call delete method of product object
    .then(() => { // then redirect
        console.log('DESTROYED PRODUCT')
        res.redirect('/admin/products')
    })
    .catch(err => console.log(err));
}