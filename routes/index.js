const router = require('express').Router();
const apiRoutes = require('./api');
//const userRoutes = require('./api/userRoutes');
//const thoughtRoutes = require('./api/thoughtRoutes');

router.use('/api', apiRoutes);
//router.use('api/users', userRoutes);
//router.use('api/thoughts', thoughtRoutes);

router.use((req, res) => {
  return res.status(200).send('Wrong route!');
});

module.exports = router;
