const User = require('./User');
const Cuisine = require('./Cuisine');

User.hasMany(Cuisine, {
    foreignKey: 'user_id'
  });