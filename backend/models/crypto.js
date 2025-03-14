// Crypto Model for Hypertrader V1
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Define the Cryptocurrency model
const Cryptocurrency = sequelize.define('Cryptocurrency', {
    // Unique identifier for the cryptocurrency
    symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    
    // Full name of the cryptocurrency
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    // Current price in USD
    currentPrice: {
        type: DataTypes.DECIMAL(24, 8),
        allowNull: false,
        defaultValue: 0
    },
    
    // Market capitalization
    marketCap: {
        type: DataTypes.DECIMAL(24, 2),
        allowNull: true
    },
    
    // 24-hour trading volume
    volume24h: {
        type: DataTypes.DECIMAL(24, 2),
        allowNull: true
    },
    
    // Price change percentage in 24 hours
    priceChangePercent24h: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    
    // Whether this crypto is being actively tracked by the user
    isTracked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    
    // Last updated timestamp
    lastUpdated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    // Define table name explicitly
    tableName: 'cryptocurrencies',
    
    // Add timestamps (createdAt, updatedAt)
    timestamps: true
});

// Crypto model CRUD operations
const CryptoModel = {
    // Initialize tables
    initTables: async () => {
        try {
            // Sync models with database (create tables if not exist)
            await Cryptocurrency.sync();
            console.log('Cryptocurrency table synchronized successfully');
            return true;
        } catch (error) {
            console.error('Error synchronizing tables:', error);
            return false;
        }
    },
    
    // Get all cryptocurrencies
    getAll: async () => {
        try {
            return await Cryptocurrency.findAll();
        } catch (error) {
            console.error('Error fetching cryptocurrencies:', error);
            throw error;
        }
    },
    
    // Get a specific cryptocurrency by symbol
    getById: async (symbol) => {
        try {
            return await Cryptocurrency.findByPk(symbol);
        } catch (error) {
            console.error(`Error fetching cryptocurrency ${symbol}:`, error);
            throw error;
        }
    },
    
    // Add a new cryptocurrency
    add: async (cryptoData) => {
        try {
            const crypto = await Cryptocurrency.create(cryptoData);
            return { success: true, data: crypto };
        } catch (error) {
            console.error('Error adding cryptocurrency:', error);
            throw error;
        }
    },
    
    // Update cryptocurrency data
    update: async (symbol, cryptoData) => {
        try {
            const [updated] = await Cryptocurrency.update(cryptoData, {
                where: { symbol }
            });
            
            if (updated) {
                const updatedCrypto = await Cryptocurrency.findByPk(symbol);
                return { success: true, data: updatedCrypto };
            }
            
            return { success: false, message: 'Cryptocurrency not found' };
        } catch (error) {
            console.error(`Error updating cryptocurrency ${symbol}:`, error);
            throw error;
        }
    },
    
    // Remove a cryptocurrency
    remove: async (symbol) => {
        try {
            const deleted = await Cryptocurrency.destroy({
                where: { symbol }
            });
            
            return { success: deleted > 0, deleted };
        } catch (error) {
            console.error(`Error removing cryptocurrency ${symbol}:`, error);
            throw error;
        }
    }
};

module.exports = CryptoModel; 