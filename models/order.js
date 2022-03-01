const Sequelize = require('sequelize'); // import a Sequelizze object

const sequelize = require('../util/database'); // link to the database file

// define the model, setting the schema for each column.
// the order table only has one manually created column for id
const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }
});

module.exports = Order;