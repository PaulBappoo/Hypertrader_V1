// Database Configuration for Hypertrader V1

// This file will contain database connection settings
// It's kept minimal now but will be expanded with actual database setup

const dbConfig = {
    // These would be set via environment variables in a real application
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'hypertrader',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    
    // Connection options
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // other options would go here
    },
    
    // Get connection string (for MongoDB example)
    getConnectionString: function() {
        const auth = this.user && this.password 
            ? `${this.user}:${this.password}@` 
            : '';
        return `mongodb://${auth}${this.host}:${this.port}/${this.name}`;
    }
};

module.exports = dbConfig; 