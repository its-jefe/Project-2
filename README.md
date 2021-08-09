# Easy Eats
![Screenshot1](https://github.com/its-jefe/Project-2/blob/develop/public/assets/images/easyeats_logo.png)
- Easy Eats is a full stack web application where a user can sign up, log in to our app and have access to restaurants around their area. The user will be able to pick cuisines available in their area and the app will list restaurants within the area with the available cuisine.

# Challenges 
- [x] Use a Node and Express web server
- [x] Creating routes for retrieving and adding new data
- [x] Folder structure that meets MVC paradigms
- [x] Protect API keys in Node with environment variables(.env/heroku)
- [x] Asynchronicity

# Technologies
- [x] HTML
- [x] CSS
- [x] Javascript
- [x] Bootstrap
- [x] APIs – Travel Advisor, IP Geolocation
- [x] NPM Dependencies
    - axios (NEW)
    - [parsley][parsley] (NEW : future implementation)
    - bcrypt
    - connect-session-sequelize
    - dotenv
    - express
    - express-handlebars
    - express-session
    - handlebars
    - mysql2
    - sequelize
- [x] Heroku
    - JawsDB

# Contributors
- Timson, Jeff - Project Lead/JS/Structure Backend
- Koberstine, Chris - JavaScript/Distribution/Database Backend
- Gonzalez, Gabriel - Vetted APIs/Frontend/ReadMe/Slides
- Victor, Mervens - Functionality/BootStrap/MarkDown/Layout

# Links
- Github https://github.com/its-jefe/Project-2
- Heroku https://glistening-geese.herokuapp.com/

[parsley]:https://parsleyjs.org/

## Potential Issues
- If the user takes a long time to pick quisines, restaurants may close
    - would like to add clock functions to keep track of closing times for restaurants
    - maybe also add a warning for the user to be cautious of this
    - Closing times are returned from the API's so after the user has made their selection based on the cuisines in their area... These closing times should be tracked on the next screen where the user can choose resturants 
    - Would be nice to make cards for each restuarant...