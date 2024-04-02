const express = require('express');
const router = express.Router();
const Thought = require('../../models/Thought');

// GET all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
        } catch (err) {
            res.status(500).json({ message: err.message });
    }
    });

    // GET a single thought by its ID
    router.get('/:id', async (req, res) => {
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
    router.post('/', async (req, res) => {
        try {
            const thought = new Thought(req.body);
            await thought.save();
            res.status(201).json(thought);
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    });

    // PUT to update a thought by its ID
    router.put('/:id', async  (req, res) => {
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
    router.delete('/:id', async (req, res) => {
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

    router.post('/:thoughtId/reactions', async (req, res) => {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: "Thought not found" });
            }
    
            // Extract reaction data from request body
            const { reactionBody, username } = req.body;
    
            // Create a new reaction object
            const newReaction = {
                reactionBody,
                username
            };
    
            // Push the new reaction to the reactions array
            thought.reactions.push(newReaction);
            await thought.save();
    
            res.status(201).json({ message: "Reaction created successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: "Thought not found" });
        }

        // Find the index of the reaction with the specified reactionId
        const reactionIndex = thought.reactions.findIndex(reaction => reaction.reactionId.toString() === req.params.reactionId);
        if (reactionIndex === -1) {
            return res.status(404).json({ message: "Reaction not found" });
        }

        // Remove the reaction from the reactions array
        thought.reactions.splice(reactionIndex, 1);
        await thought.save();

        res.status(200).json({ message: "Reaction deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;