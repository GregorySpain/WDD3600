const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
    constructor(title, price, description, imageUrl, id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId;
    }

    save() {
        const db = getDb(); // get a database connection
        let dbOp; // used as a variable to store the proper function so it can be returned as a promise
        if (this._id) { // if the product id is set
            // set dbOp as a function to update the product
            dbOp = db.collection('products') // .collection to select working collection
            // updateOne takes a selector and an operator as params. $set is a mongoDb keyword
            .updateOne({_id: this._id}, {$set: this});
        } else { // if the product id isn't set it is a new product
            dbOp = db.collection('products')
            .insertOne(this) // insert new product into the collection
        }
        
        return dbOp // return dbOp instead of just calling it so it returns a promise
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        })
    }

    // method to get all data
    static fetchAll() {
        const db = getDb(); // get db connection
        return db // return as a promise
            .collection('products')
            .find() // with no filter this returns all deocuments
            .toArray() // .find provides a cursor, this turns the data into an array (only for small data)
            .then(products => {
                console.log(products);
                return products; // return products as an array
            })
            .catch(err => {
                console.log(err);
            })

    }

    // method to get one product by id
    static findById(prodId) {
        const db = getDb();
        return db.collection('products')
        .find({
            _id: new mongodb.ObjectId(prodId) // working but throwing a BSON error
        })
        .next() // get the first document
        .then(product => {
            console.log(product);
            return product; // return a single product
        })
        .catch(err => {
            console.log(err);
        })
    }

    // method to delete a product
    static deleteById(prodId) {
        const db = getDb();
        return db.collection('products')
        .deleteOne({_id: new mongodb.ObjectId(prodId)}) // call delete on method and pass filter
        .then(result => { // log a confirmation of deletion
            console.log('Deleted');
        })
        .catch(err => {
            console.log(err);
        });
       
    }
}

module.exports = Product;