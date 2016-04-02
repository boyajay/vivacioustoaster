const User = require('./users');
const helpers = require('../config/helpers');
const Trip = require('../trips/trips');

module.exports = {

  getUser: (req, res, next) => {
    res.json(req.user);
  },

  getFriends: (req, res, next) => {
    User.getUserFriends(req.user)
    .then(friends => {
      res.json(friends);
    })
    .catch(err => {
      helpers.errorHandler(err, req, res, next);
    });
  },

  getTravelFriends: (req, res, next) => {
    Trip.findOne({ where: { id: req.params.tripId } })
      .then(trip => trip.getUsers())
      .then(users => res.json(users))
      .catch(err => {
        helpers.errorHandler(err, req, res, next);
      });
  },

};
