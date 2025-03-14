// API Routes for Hypertrader V1

import express from 'express';
import fetch from 'node-fetch';
import CryptoModel from '../models/crypto.js';

const router = express.Router();

// Get all cryptocurrencies from database
router.get('/crypto', async (req, res) => {
    try {
        const cryptos = await CryptoModel.getAll();
        res.json(cryptos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific cryptocurrency
router.get('/crypto/:id', async (req, res) => {
    try {
        const crypto = await CryptoModel.getById(req.params.id);
        if (!crypto) {
            return res.status(404).json({ message: 'Cryptocurrency not found' });
        }
        res.json(crypto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new cryptocurrency
router.post('/crypto', async (req, res) => {
    try {
        const result = await CryptoModel.add(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a cryptocurrency
router.put('/crypto/:id', async (req, res) => {
    try {
        const result = await CryptoModel.update(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a cryptocurrency
router.delete('/crypto/:id', async (req, res) => {
    try {
        const result = await CryptoModel.remove(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Binance API proxy for exchange info (to avoid CORS issues)
router.get('/binance/exchangeInfo', async (req, res) => {
    try {
        const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching Binance exchange info:', error);
        res.status(500).json({ error: 'Failed to fetch from Binance API' });
    }
});

// Binance API proxy for ticker data
router.get('/binance/ticker/:symbol', async (req, res) => {
    try {
        const symbol = req.params.symbol;
        const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching Binance ticker data:', error);
        res.status(500).json({ error: 'Failed to fetch ticker data from Binance API' });
    }
});

export default router; 