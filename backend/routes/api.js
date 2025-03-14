// API Routes for Hypertrader V1

const express = require('express');
const router = express.Router();
const CryptoModel = require('../models/crypto');

// Get all cryptocurrencies
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

module.exports = router; 