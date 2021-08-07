const router = require('express').Router();
// const sequelize = require('../config/connection');
const { User, Cuisine } = require('../models');
var async = require('async');

router.get('/', (req, res) => {
  console.log('======================');
  res.render('landing-page');
})

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
})

router.get('/history', (req, res) => {
  res.render('history');
})

router.get('/im-hungry', (req, res) => {
  res.render('im-hungry', async function () { // pretty sure I need to pass an object
    // let [cuisines, restaurants] = await fetchFromAPI
    // console.log(test)
  });
})

router.get('/404', (req, res) => {
  res.render('404');
})

module.exports = router;