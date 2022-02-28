const mysql = require('mysql2'); // import mysql2

// this creates a "pool" of database connections to tap into.
// the parameters are for accessing the database.
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'root'
});

// export the pool as a promise, then a method is
// called it will execute with then and catch blocks
module.exports = pool.promise();