const db = require('../config/db');
const Sequelize = require('sequelize');
const Trip = require('../trips/trips');
const extendResourceWithPhotos = require('../utils/flickrSearch');

const Destination = db.define('destinations', {
  startDate: Sequelize.DATE,
  endDate: Sequelize.DATE,
  location: Sequelize.STRING,
  photoUrl: Sequelize.STRING,
});

// creates tripId column in destinations table
Destination.belongsTo(Trip, { constraints: false });

// will add methods to Trip (ex. Trip.getDestinations())
Trip.hasMany(Destination, { constraints: false });

Destination.sync();
Trip.sync();

Destination.createDestinations = destinations =>
  extendResourceWithPhotos(destinations)
    .then(destinationsWithPhotos =>
      // returning true to gain access to the destination ID from the db.
      Destination.bulkCreate(destinationsWithPhotos, { returning: true })
    )
    .catch(err => err);

Destination.getDestinations = tripId =>
  Destination.findAll({ where: { tripId } }).catch(err => err);

Destination.deleteDestination = id =>
  Destination.destroy({ where: { id } }).catch(err => err);

module.exports = Destination;
