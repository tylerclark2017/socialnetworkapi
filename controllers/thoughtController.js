const { Thought } = require('./models/Thought');

const thoughtController = {
    // GET all thoughts
    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // GET a thought by its ID
    getThoughtById: async (req, res) => {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // CREATE a new thought
    createThought: async (req, res) => {
        try {
            const newThought = await Thought.create(req.body);
            res.json(newThought);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // UPDATE a thought by its ID
    updateThought: async (req, res) => {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true });
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // DELETE a thought by its ID
    deleteThought: async (req, res) => {
        try {
            const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!deletedThought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json({ message: 'Thought deleted successfully' });
        } catch (err) {
            res.status(400).json(err);
        }
    }
};

module.exports = thoughtController;