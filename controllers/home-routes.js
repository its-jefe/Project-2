// All of the user-facing routes

const router = require('express').Router();
const sequelize = require('../config/connection');
// const { Post, User, Comment, Vote } = require('../models');

router.get('/', (req, res) => {
  res.render('login');
});

module.exports = router;