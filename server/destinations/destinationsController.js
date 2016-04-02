const _ = require('lodash');
const helpers = require('../config/helpers');
const Destination = require('./destinations');
const Trip = require('../trips/trips');

module.exports = {
  // Params: req.body.destinations is an array of destination objects.
  // Returns: array of created destinations
  createAll: (req, res, next) => {
    // extend destination objects with tripId from url param
    const tripIds = Array(req.body.destinations.length).fill({ tripId: req.params.tripId });
    const newDestinations = _.merge(req.body.destinations, tripIds);

    Destination.createDestinations(newDestinations)
      .then(destinations => {
        res.status(201).json(destinations);
      })
      .catch((err) => {
        helpers.errorHandler(err, req, res, next);
      });
  },

  get: (req, res, next) => {
    // TODO
    res.end();
  },

  getAll: (req, res, next) => {
    Destination.getDestinations(req.params.tripId)
      .then(destinations => {
        res.json(destinations);
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
    Destination.deleteDestination(req.params.destId)
      .then(() => {
        res.end();
      })
      .catch((err) => {
        helpers.errorHandler(err, req, res, next);
      });
  },
};
