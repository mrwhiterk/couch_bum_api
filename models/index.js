const mongoose = require('../db/connection');

module.exports = {
  User: mongoose.model('User', require('./user')),
  Listing: mongoose.model('Listing', require('./listing')),
  Skill: mongoose.model('Skill', require('./skill')),
  Booking: mongoose.model('Booking', require('./booking')),
};
