const User = require('./User');
const Cuisine = require('./Cuisine');

User.hasMany(Cuisine, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });

module.exports = { User, Cuisine }