// GET all users
const userController = {
    // GET all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (err) {
            res.status(400).json(err);
        }
    },
// GET a user by their ID
    getUserById: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },
// CREATE a new user
    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            res.status(400).json(err);
        }
    },
// UPDATE a user by their ID
    updateUser: async (req, res) => {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },
// DELETE a user by their ID
    deleteUser: async (req, res) => {
        try {
            const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(400).json(err);
        }
    }
};

module.exports = userController;