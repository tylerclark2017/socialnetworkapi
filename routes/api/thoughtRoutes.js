const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');

// GET all thoughts
router.get('/api/thoughts', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
        } catch (err) {
            res.status(500).json({ message: err.message });
    }
    });

    // GET a single thought by its ID
    router.get('/api/thoughts/:id', async (req, res) => {
        try {
            const thought = await Thought.findById(req.params.id);
            
            if(!thought) {
                return res.status(404).json({ message: 'No thought with this id!'});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // POST a new thought
    router.post('/api/thoughts', async (req, res) => {
        try {
            const thought = new Thought(req.body);
            await thought.save();
            res.status(201).json(thought);
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    });

    // PUT to update a thought by its ID
    router.put('api/thoughts/:id', async  (req, res) => {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true});
            if(!thought) {
                return res.status(404).json({ message: 'No thought with this id!'});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // DELETE a thought by its ID
    router.delete('/api/thoughts/:id', async (req, res) => {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.id);
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id, nothing to delete!'});
            }
            res.json({ message: "Thought successfully deleted"});
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
        });
