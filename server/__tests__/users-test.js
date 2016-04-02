const expect = require('expect');
const Promise = require('bluebird');
const User = require('../users/users');
const testData = require('./testData');
// const Trip = require('../trips/trips');
// const Destination = require('../destinations/destinations');
// const Event = require('../events/events');
// const Tag = require('../tags/tags');

// The `clearDB` helper function, when invoked, will clear the database
// by dropping the db - this is what the { force: true } is for
const clearDB = () => Promise.all([
  User.sync({ force: true }),
  // Trip.sync({ force: true }),
  // Destination.sync({ force: true }),
  // Event.sync({ force: true }),
  // Tag.sync({ force: true }),
]);

const testUsers = testData.testUsers;

describe('User Model', () => {
  beforeEach(() => clearDB().then(() => 
    Promise.all(testUsers.map(user => User.create(user)))));

  it('should create a token', () => {
    User.createToken('reg-9gf-sf2').then(response => {
      expect(typeof response.token).to.equal('string');
    });
  });

  // clearDB to ensure we actually create a new user
  it('should create a user in the database', () => clearDB()
    .then(() => {
      const profile = {
        displayName: testUsers[2].name,
        photos: [{ value: testUsers[2].picUrl }],
        id: testUsers[2].fbId,
      };

      User.findOrCreate(profile).then(user => {
        expect(user.name).to.equal(profile.displayName);
      });
    }
  ));

  it('should update a user in the database', () => {
    User.findOne({ where: { name: 'Leran Firer' }}).then(user => {
      const profile = {};
      profile.displayName = 'Firer Leran';
      User.findOrCreate(profile).then(updatedUser => {
        expect(updatedUser.name).to.equal('Firer Leran');
      });
    });
  });

  it('should retrieve a user\'s friends from the database', () => {
    const friendIds = ['ad7-lr0-fd8', 'of8-a6s-lf0', 'qw0-lm1-pt8'];
    const profile = {
      displayName: testUsers[0].name,
      photos: [{ value: testUsers[0].picUrl }],
      id: testUsers[0].fbId,
    };

    User.findOne({ where: { name: 'Akshay Buddiga' }}).then(user => {
      Promise.all(friendIds.map(fbId => User.findOne({ where: { fbId }})))
        .then(friends => 
          user.addFriends(friends).then(() => 
            User.getUserFriends(user).then(returnedFriends => {
              expect(returnedFriends).to.deep.equal(friends);
            })));
    });
  });

});
