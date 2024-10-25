require('dotenv').config()
const { Sequelize } = require('sequelize')

// Creating connection to the database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
})

// Connection testing
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log(`Backend connected with ${process.env.DB_NAME} database successfully...`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

//Function call
testConnection();

module.exports = sequelize;