// Imports 
const router = require('express').Router();
// const sequelize = require('../config/connection');
// const { User, Cuisine } = require('../models');
const fetchFunc = require('../utils/fetching.js')
// Can i start with a req.format before any of these routes are hit?

let sessionStorage = {}

// Routes
router.get('/', async (req, res) => {
  res.render('hungry');
})

router.get('/cuisines', async (req, res) => {
  console.log('Get: Cuisines')
  await fetchFunc()
    .then(fetched => {
      console.log(fetched)
      sessionStorage = fetched
      let cuisines = sessionStorage.cuisines
      res.render('cuisines', cuisines);
    })
})

router.get('/restaurants', async (req, res) => {
  console.log('Get: Restaurants')
  res.render('restaurants', sessionStorage.restaurants);
})

router.get('/login', (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }
  res.render('login');
})

router.get('/history', (req, res) => {
  res.render('history');
})

let myBool = true;

// router.get('/hungry', async (req, res) => {
//   await fetchFunc()
//     .then(fetched => {
//       console.log(fetched)
//       res.render('hungry', fetched);
//     })
//   console.log('Get: Hungry')
// });

// router.post('/hungry', async (req, res) => {
//   console.log('Post: Im hungry and this is bool')
//   myBool = !myBool
//   res.json(req.body)
// });

router.get('/404', (req, res) => {
  res.render('404');
})

module.exports = router;