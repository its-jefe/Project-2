const router = require('express').Router();

router.use('/', require('./home-routes.js'));

router.use('/api', require('./api')); // accesses api folder -> runs from api/index.js

module.exports = router;