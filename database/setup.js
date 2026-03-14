const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config();

const db = new Sequelize({
    dialect: 'sqlite',
    storage: `database/${process.env.DB_NAME}` || 'database/library.db',
    logging: console.log // Not necessary, but shows SQL queries in the console
})

// Create database and models
async function setupDatabase() {
    try {
        await db.authenticate();
        console.log('Connection to database established successfully.');

        await db.sync({ force: true })
        console.log("Database and tables created successfully")

        await db.close();

    } catch(error) {
        console.error('Unable to connect to the database', error);
    }
};


const Book = db.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isbn: {
        type: DataTypes.STRING,
        unique: true
    },
    genre: {
        type: DataTypes.STRING
    },
    publishedYear: {
        type: DataTypes.INTEGER
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});


// Export the model and the connection to use in other files 
module.exports = { db, Book };

// Run setup if this file is executed directly
if (require.main === module) {
    setupDatabase();
}