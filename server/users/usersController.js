const User = require('./users');
const jwt = require('jwt-simple');
const helpers = require('../config/helpers');

module.exports = {

  getUser: (req, res, next) => {
    User.find({ where: { fb_id: req.query.fbId } })
    .then((user) => {
      const token = jwt.encode(user, 'secret');
      res.json({
        user,
        token,
      });
    })
    .catch((err) => {
      helpers.errorHandler(err, req, res, next);
    });
  },

  findOrCreate: (profile) => {
    const name = profile.displayName;
    const picture = profile.photos[0].value;
    const fbId = {
      fbId: profile.id,
    };
    User.findOne(fbId)
      .then((match) => {
        // create user if there's no match
        if (!match) {
          const newUser = {
            name,
            fbId,
            picture,
          };
          return User.create(newUser);
        }
        // if user already exists, update user entry in the database
        const updatedInfo = {
          name,
          picture,
        };
        return match.update(updatedInfo)
        .then((data) => data)
        .catch(error => { console.error('findOrCreate error: ', error); });
      })
      .catch((error) => {
        console.error('findOrCreate error: ', error);
      });
  },

};
