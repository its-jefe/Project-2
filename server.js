// The path module provides utilities for working with file and directory paths.
const path = require('path');
const express = require('express');

const session = require('express-session');

const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

require('dotenv').config();

// session object
const sess = {
  secret: 'Secret secret secret!',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// express-session middleware 
// passing session object into session
app.use(session(sess));

// add functionality to handlebars
const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

// set up Handlebars.js as your app's template engine of choice:
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/*
The express.static() method is a built-in Express.js middleware function 
that can take all of the contents of a folder and serve them as static assets. 
This is useful for front-end specific files like images, style sheets, and JavaScript files.
*/
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening: ${PORT}`));
});

// const http = require("http")
// console.log(http.METHODS)
// console.log(http.STATUS_CODES)