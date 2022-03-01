const Sequelize = require('sequelize'); // import a Sequelizze object

const sequelize = require('../util/database'); // link to the database file

// define the model, setting the schema for each column.
const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;