const expect = require('expect');
const Promise = require('bluebird');
const rp = require('request-promise');
const User = require('../users/users');
const UserController = require('../users/usersController');
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

describe('User Controller', () => {
  beforeEach(() => clearDB().then(() =>
    Promise.all(testUsers.map(user => User.create(user)))));

  it('should retrieve a user\'s friends from the database', () => {
    User.findAll({}).then(users => {
      const user = users[0];
      const friends = users.slice(1);
      const options = {
        method: 'GET',
        uri: 'api/me/friends',
        user: user,
      };
      
      user.addFriends(friends).then(() => {
        rp(options).then(userFriends => {
          expect(userFriends).to.deep.equal(friends);
        });
      });
    });
  });

});
