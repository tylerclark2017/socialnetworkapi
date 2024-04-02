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

    // POST to create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: "Thought not found" });
        }

        // Assuming req.body contains the reaction data
        thought.reactions.push(req.body);
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

        // Remove the reaction from the reactions array
        thought.reactions.pull({ _id: req.params.reactionId });
        await thought.save();

        res.status(200).json({ message: "Reaction removed successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;