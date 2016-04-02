const _ = require('lodash');
const helpers = require('../config/helpers');
const Event = require('./events');
const Destination = require('../destinations/destinations');

module.exports = {

  // Params: req.body.events is an array of event objects.
  // Returns: array of created events
  createAll: (req, res, next) => {
    // extend event objects with destId from url param
    const destIds = Array(req.body.events.length).fill({ destId: req.params.destId });
    const newEvents = _.merge(req.body.events, destIds);

    Event.createEvents(newEvents)
      .then(events => {
        Destination.findOne({ where: { id: req.params.destId } })
          .then(destination => {
            destination.getTrip()
              .then((trip) => {
                res.status(201).json(trip);
              });
          });
      })
      .catch(err => {
        helpers.errorHandler(err, req, res, next);
      });
  },

  getAll: (req, res, next) => {
    Event.getEvents(req.params.destId)
      .then(events => {
        res.json(events);
      })
      .catch(err => {
        helpers.errorHandler(err, req, res, next);
      });
  },

};
