const db = require('../config/db');
const Sequelize = require('sequelize');
const Destination = require('../destinations/destinations');
const extendResourceWithPhotos = require('../utils/flickrSearch');

const Event = db.define('events', {
  address: Sequelize.STRING,
  lat: Sequelize.FLOAT,
  lng: Sequelize.FLOAT,
  icon: Sequelize.STRING,
  name: Sequelize.STRING,
  placeId: Sequelize.STRING,
  rating: Sequelize.FLOAT,
  tags: Sequelize.ARRAY(Sequelize.STRING),
  photoUrl: Sequelize.STRING,
});

// creates destId column in events table
Event.belongsTo(Destination, { foreignKey: 'destId', constraints: false });

// will add methods to Destination (ex. Destination.getEvents())
Destination.hasMany(Event, { foreignKey: 'destId', constraints: false });

Event.sync();
Destination.sync();

Event.createEvents = events =>
  extendResourceWithPhotos(events)
    .then(eventsWithPhotos =>
      Event.bulkCreate(events, { returning: true })
    )
    .catch(err => err);

Event.getEvents = destId => Event.findAll({ where: { destId } })
    .catch(err => err);

module.exports = Event;
