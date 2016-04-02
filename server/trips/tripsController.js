const _ = require('lodash');
const helpers = require('../config/helpers');
const Trip = require('../trips/trips');
const Destination = require('../destinations/destinations');
const Event = require('../events/events');
const User = require('../users/users');
const Vote = require('../votes/votes');
const Promise = require('bluebird');

module.exports = {
  // Params: req.body has a trip name and friends. Req.user injected via jwt
  // Returns: created trip

  create: (req, res, next) => {
    const eventList = req.body.events;
    Trip.createTrip(req.body.name, req.body.tripType)
      .then(trip => {
        Destination.createDestinations(req.body.destinations)
          .then(destinations => {
            trip.addDestinations(destinations)
              .then(() => {
                Promise.all(eventList.map((events, eventIdx) => // eslint-disable-line
                  Event.createEvents(events)
                    .then(eventsInDest =>
                      destinations.map((destination, destIdx) => { // eslint-disable-line
                        if (destIdx === eventIdx) {
                          destination.addEvents(eventsInDest);
                        }
                      })
                    )))
                .then(() => {
                  const addUsers = [...req.body.friends, req.user];
                  Promise.all(addUsers.map(addUser =>
                    User.findOne({ where: { fbId: addUser.fbId } })
                  ))
                  .then(users =>
                    trip.addUsers(users)
                      .then(() => res.status(201).json(trip))
                  );
                });
              });
          });
      })
      .catch(err => {
        helpers.errorHandler(err, req, res, next);
      });
  },

  get: (req, res, next) => {
    Trip.getTrip(req.params.tripId)
    .then(trip => res.json(trip))
    .catch(err => {
      helpers.errorHandler(err, req, res, next);
    });
  },

  getAll: (req, res, next) => {
    Trip.getAllTrips(req.user)
      .then(trips => {
        res.json(trips);
      })
      .catch(err => {
        helpers.errorHandler(err, req, res, next);
      });
  },

  update: (req, res, next) => {
    // TODO
    res.end();
  },

  delete: (req, res, next) => {
    Trip.deleteTrip(req.params.tripId)
      .then(() => res.end())
      .catch(err => {
        helpers.errorHandler(err, req, res, next);
      });
  },

  addFriends: (req, res, next) => {
    Trip.addFriendsToTrip(req.params.tripId, req.body.friends)
    .then(trip => res.status(201).json(trip))
    .catch(err => {
      helpers.errorHandler(err, req, res, next);
    });
  },

};
