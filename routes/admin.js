const path = require('path');

const express = require('express');
const { check, body } = require('express-validator');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product',
    isAuth,
    [
        body('title')
            .trim()
            .isLength({min: 3})
            .isString(),
        body('imageUrl')
            .trim()
            .isURL(),
        body('price')
            .trim()
            .isFloat(),
        body('description')
            .trim()
            .isLength({min: 5})
    ],
    adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product',
    isAuth,
    [
        body('title')
            .trim()
            .isLength({min: 3})
            .isString(),
        body('imageUrl')
            .trim()
            .isURL(),
        body('price')
            .trim()
            .isFloat(),
        body('description')
            .trim()
            .isLength({min: 5, max: 400})
    ],
    adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
