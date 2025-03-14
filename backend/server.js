// Hypertrader V1 - Backend Server

const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');
const dbConfig = require('./config/database');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the parent directory
app.use(express.static(path.join(__dirname, '..')));

// API Routes
app.use('/api', apiRoutes);

// Status route
app.get('/api/status', (req, res) => {
    res.json({ 
        status: 'online', 
        message: 'Hypertrader V1 backend is running',
        time: new Date() 
    });
});

// Catch-all route to serve the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Database connection (placeholder for now)
const connectDatabase = () => {
    console.log('Database connection would be established here');
    console.log(`Connection string would be: ${dbConfig.getConnectionString()}`);
    // Will implement actual database connection later
};

// Start the server
app.listen(PORT, () => {
    console.log(`Hypertrader V1 server is running on port ${PORT}`);
    connectDatabase();
});

// Error handling
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.error(err);
    process.exit(1);
}); 