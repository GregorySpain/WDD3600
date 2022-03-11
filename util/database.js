const mongodb = require('mongodb'); // import mongodb
const MongoClient = mongodb.MongoClient; // extract MongoClient constructor

let _db;

const mongoConnect = (callback) => { // function receives a callback
    // this connects to the db a returns a client as a promise
    MongoClient.connect('mongodb+srv://root:MyoyQ4MsFrV8rt1u@cluster0.ad8ew.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => { 
        console.log('Connected!');
        _db = client.db(); // set database connection to variable
        callback(); // execute callback function (app.listen)
    })
    .catch(err => {
        console.log(err);
        throw err; // throw error
    });
};

// function for getting a database connection
const getDb = () => {
    if (_db) { // if _db is defined, return the connection
        return _db
    }
    throw 'No Database Found!';
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
