'use strict'; // eslint-disable-line
const db = require('../config/db');
const Sequelize = require('sequelize');
const User = require('../users/users');
const Promise = require('bluebird');

const Trip = db.define('trips', {
  name: Sequelize.STRING,
  tripType: Sequelize.STRING,
});

const UserTrip = db.define('userTrips', {
  viewed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

// creates tripId column in userTrips join table
// creates userId column in userTrips join table
// will add methods to User and Trip (ex. User.getTrips(), Trip.getUsers())
User.belongsToMany(Trip, { through: UserTrip, constraints: false });
Trip.belongsToMany(User, { through: UserTrip, constraints: false });

UserTrip.sync();
Trip.sync();
User.sync();

// Model functions

// returns a trip object with users and destinations
// properties attached to display on my trips page
const getTripInfo = trip =>
  trip.getUsers().then(users =>
    trip.getDestinations().then(destinations => {
      const fullTrip = {};

      // sequelize returns model instances with many additional
      // properties, this extracts the data we are interested in
      for (let tripKey in trip.dataValues) { // eslint-disable-line
        fullTrip[tripKey] = trip.dataValues[tripKey];
      }

      const newUser = {};
      // we have to apply the same logic to users
      fullTrip.users = users.map(user => {
        for (let userKey in user.dataValues) { // eslint-disable-line
          if (user.dataValues.hasOwnProperty(userKey)) {
            newUser[userKey] = user.dataValues[userKey];
          }
        }
        return newUser;
      });

      const newDestination = {};
      // we have to apply the same logic to destinations
      fullTrip.destinations = destinations.map(destination => {
        for (let destKey in destination.dataValues) { // eslint-disable-line
          if (destination.dataValues.hasOwnProperty(destKey)) {
            newDestination[destKey] = destination.dataValues[destKey];
          }
        }
        return newDestination;
      });

      // return our full trip object
      return fullTrip;
    })
  .catch(err => err));

Trip.createTrip = (name, tripType) =>
  Trip.create({ name, tripType }).catch(err => err);

Trip.getAllTrips = userObj =>
  User.findOne({ where: { fbId: userObj.fbId } })
    .then(user =>
      user.getTrips()
        .then(trips =>
          Promise.all(trips.map(trip => getTripInfo(trip))))
        .catch(err => err));

Trip.deleteTrip = id => Trip.destroy({ where: { id } }).catch(err => err);

module.exports = Trip;
