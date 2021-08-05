const router = require('express').Router();

// accesses api folder
const apiRoutes = require('./api');
router.use('/api', apiRoutes);
// connects to apiRoutes when /api is visited

const homeRoutes = require('./home-routes')
router.use('/', homeRoutes);
// connects to home
// pretty sure this needs to be the last route

// likely unecessary
const catchRoutes = require('./catch-routes') 
router.use('*', catchRoutes);
// can create a cathcall like this?
// instead of 


router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;