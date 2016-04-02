const _ = require('lodash');
const helpers = require('../config/helpers');
const Vote = require('./votes');
const Promise = require('bluebird');

module.exports = {
  // Params: req.body has votes, req.params has the eventId
  // Returns: created votes
  createOrDelete: (req, res, next) => {
    Vote.createOrDeleteVote(req.user.id, req.params.eventId)
      .then(votes => {
        res.status(201).json(votes);
      })
      .catch(err => {
        helpers.errorHandler(err, req, res, next);
      });
  },

  getAll: (req, res, next) => {
    Vote.getAllVotes(req.params.eventId)
      .then(votes => {
        res.json(votes);
      })
      .catch(err => {
        helpers.errorHandler(err, req, res, next);
      });
  },
};
