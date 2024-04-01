const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// All of these routes are ALREADY PREFIXED WSITH '/api/users'
// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single user by its _id and populated thought and friend data
router.get('/:id', async (req, res) => {
    try {
        //const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
        const user = await User.findById(req.params.id);
        console.log("User Obj: ", user)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({ message: err.message });
    }
});

// POST a new user 
router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT to update a user by their _id
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE to remove a user by their _id
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Bonus: Remove user's associated thoughts
        // await Thought.deleteMany({ _id: { $in: user.thoughts } });
        // res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;