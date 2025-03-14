# Hypertrader V1

A cryptocurrency trading bot platform with a JavaScript frontend and Node.js backend.

## Project Structure

- Frontend: Pure JavaScript, HTML, and CSS
- Backend: Node.js with Express
- Database: Configurable (MongoDB supported by default)

## Setup Instructions

### Frontend

The frontend is pure JavaScript and can be served directly from the root directory.

### Backend

1. Navigate to the backend directory:
```
cd backend
```

2. Install dependencies:
```
npm install
```

3. Start the server:
```
npm start
```

For development with auto-reload:
```
npm run dev
```

## API Endpoints

- `GET /api/status` - Check server status
- `GET /api/crypto` - Get all cryptocurrencies
- `GET /api/crypto/:id` - Get a specific cryptocurrency
- `POST /api/crypto` - Add a new cryptocurrency
- `PUT /api/crypto/:id` - Update a cryptocurrency
- `DELETE /api/crypto/:id` - Delete a cryptocurrency

## Development

This is a blank framework that will be expanded to include:

- Real-time cryptocurrency data
- Trading algorithms
- User authentication
- Portfolio tracking
- Historical data analysis
- Trading automation

## License

MIT 