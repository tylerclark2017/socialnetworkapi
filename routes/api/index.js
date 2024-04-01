const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// all of these routes are prefixed with '/api'
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);


module.exports = router;