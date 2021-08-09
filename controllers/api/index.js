const router = require('express').Router();

router.use('/misc', require('./misc-routes.js'));
router.use('/users', require('./user-routes.js'));

module.exports = router;