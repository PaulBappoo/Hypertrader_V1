// Database Configuration for Hypertrader V1
const { Sequelize } = require('sequelize');

// Initialize dotenv if available
try {
    require('dotenv').config();
} catch (err) {
    console.log('dotenv not loaded');
}

// Extract database connection info from environment variables
// Format for Render PostgreSQL: postgres://user:password@host:port/database
const dbUrl = process.env.DATABASE_URL || process.env.RENDER_DATABASE_URL;

let sequelize;

if (dbUrl) {
    // For production: use the provided database URL
    sequelize = new Sequelize(dbUrl, {
        dialect: 'postgres',
        ssl: true,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // For Render PostgreSQL
            }
        },
        logging: false
    });
} else {
    // For development: use local config
    sequelize = new Sequelize({
        database: process.env.DB_NAME || 'hypertrader',
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false
    });
}

// Test the connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        return true;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return false;
    }
};

module.exports = {
    sequelize,
    testConnection
}; 