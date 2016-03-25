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

const getTripInfo = trip =>
  trip.getUsers().then(users =>
    trip.getDestinations().then(destinations => {
      trip.users = users;
      trip.destinations = destinations;
      return trip;
    }))
  .catch(err => err);

Trip.createTrip = (name, tripType) =>
  Trip.create({ name, tripType }).catch(err => err);

Trip.getAllTrips = userObj =>
  User.findOne({ where: { fbId: userObj.fbId } })
    .then(user =>
      user.getTrips()
        .then(trips => Promise.all(trips.map(trip => getTripInfo(trip))))
        .catch(err => err));

Trip.deleteTrip = id => Trip.destroy({ where: { id } }).catch(err => err);

module.exports = Trip;
