const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const path = require('path');
const destinationsController = require('../destinations/destinationsController');
const eventsController = require('../events/eventsController');
const tripsController = require('../trips/tripsController');
const placeSearchController = require('../placeSearch/placeSearchController');
const usersController = require('../users/usersController');
const votesController = require('../votes/votesController');
const User = require('../users/users');
const helper = require('./helpers');

module.exports = function (app, express) {
  // Users
  app.use('/api/me', helper.decode);
  app.get('/api/me', usersController.getUser);
  app.get('/api/me/friends', usersController.getFriends);
  app.get('/api/trips/:tripId/users', usersController.getTravelFriends);

  // Trips
  app.use('/api/trips', helper.decode);
  app.get('/api/trips', tripsController.getAll);
  app.get('/api/trips/:tripId', tripsController.get);
  app.post('/api/trips/:tripId/users', tripsController.addFriends);
  app.delete('/api/trips/:tripId', tripsController.delete);
  app.post('/api/trips', tripsController.create);

  // Destinations
  app.post('/api/trips/:tripId/destinations', destinationsController.createAll);
  app.get('/api/trips/:tripId/destinations', destinationsController.getAll);
  app.delete('/api/destinations/:destId', destinationsController.delete);

  // Events
  app.post('/api/destinations/:destId/events', eventsController.createAll);
  app.get('/api/destinations/:destId/events', eventsController.getAll);

  // Votes
  app.use('/api/events/:eventId/votes', helper.decode);
  app.get('/api/events/:eventId/votes', votesController.getAll);
  app.post('/api/events/:eventId/votes', votesController.createOrDelete);

  // Google Places
  app.post('/api/placeSearch', placeSearchController.search);

// FACEBOOK AUTH
  app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['user_friends', 'email'] }));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
      User.createToken(req.user.id)
      .then(response => {
        res.cookie('token', response.token);
        res.redirect('/');
      });
    });

  // Wildcard
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../..', 'client', 'index.html')));
};
