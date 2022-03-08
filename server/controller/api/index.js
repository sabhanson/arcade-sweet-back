const router = require('express').Router();
const userRoutes = require('./user-routes');
const userProfileRoutes = require('./userProfile-routes');
const scoreRoutes = require('./score-routes')

router.use('/users', userRoutes);
router.use('/userProfile', userProfileRoutes);
router.use('/scores', scoreRoutes);

module.exports = router;