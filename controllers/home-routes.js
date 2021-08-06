const router = require('express').Router();
// const sequelize = require('../config/connection');
const { User, Cuisine } = require('../models');

router.get('/', (req, res) => {
    console.log('======================');
    res.render('homepage');
})

router.get('/login', (req, res) => {
    // if (req.session.loggedIn) {
    //   res.redirect('/');
    //   return;
    // }
    res.render('login');
  })

module.exports = router;