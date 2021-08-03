// All of the user-facing routes

const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');

/*
Previously, we used res.send() or res.sendFile() for the response. Because we've hooked up a template engine, 
we can now use res.render() and specify which template we want to use. In this case, we want to render the 
homepage.handlebars template (the .handlebars extension is implied). This template was light on content; 
it only included a single <div>. Handlebars.js will automatically feed that into the main.handlebars template, 
however, and respond with a complete HTML file.
*/

/* 
The res.render() method can accept a second argument, an object, 
which includes all of the data you want to pass to your template.
*/

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      /*
      This will loop over and map each Sequelize object into a serialized version of itself, 
      saving the results in a new posts array. Now we can plug that array into the template. 
      However, even though the render() method can accept an array instead of an object, 
      that would prevent us from adding other properties to the template later on. 
      To avoid future headaches, we can simply add the array to an object 
      and continue passing an object to the template.
      */
      const posts = dbPostData.map(post => post.get({ plain: true }));

      res.render('homepage', {
        // pass all posts into the homepage template
        posts,
        // pass a session variable to the template
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = dbPostData.get({ plain: true });

      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
