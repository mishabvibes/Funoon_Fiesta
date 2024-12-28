const express = require('express');
const router = express.Router();
const Result = require('../models/resultSchema');

// Fetch all results
router.get('/', async (req, res) => {
    try {
        const results = await Result.find();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new result
router.post('/', async (req, res) => {
    try {
        const result = await Result.create(req.body);
        res.status(201).json({
            message: 'Data created successfully.',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
            message: 'Failed to create data. Transaction rolled back.',
        });
    }
});

// Update an existing result by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedResult = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedResult) {
            return res.status(404).json({ message: 'Result not found' });
        }
        res.status(200).json(updatedResult);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a result by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedResult = await Result.findByIdAndDelete(req.params.id);
        if (!deletedResult) {
            return res.status(404).json({ message: 'Result not found' });
        }
        res.status(200).json({ message: 'Result deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
