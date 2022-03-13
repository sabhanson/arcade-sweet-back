const router = require('express').Router();
const userRoutes = require('./user-routes');
const userProfileRoutes = require('./userProfile-routes');
const scoreRoutes = require('./score-routes');
const reviewRoutes = require('./review-routes');

router.use('/users', userRoutes);
router.use('/userProfile', userProfileRoutes);
router.use('/scores', scoreRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;