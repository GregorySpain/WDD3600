const Sequelize = require('sequelize'); // import a Sequelizze object

const sequelize = require('../util/database'); // link to the database file

// define the model, setting the schema for each column.
const OrderItem = sequelize.define('orderItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: Sequelize.INTEGER
});

module.exports = OrderItem;