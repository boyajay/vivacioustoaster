'use strict'; // eslint-disable-line
const rp = require('request-promise');
const Promise = require('bluebird');
const FLICKR_PHOTOSEARCH_URL = 'https://api.flickr.com/services/rest';
const PHOTOS_TO_RETURN = '10';
const FARM_ID = '{FARM_ID}';
const SERVER_ID = '{SERVER_ID}';
const PHOTO_ID = '{PHOTO_ID}';
const PHOTO_SECRET = '{PHOTO_SECRET}';
const FLICKR_TEMPLATE_URL = `https://farm${FARM_ID}.staticflickr.com/${SERVER_ID}/${PHOTO_ID}_${PHOTO_SECRET}.jpg`;
const redisUtils = require('./redisUtils');
const redis = require('redis');

let exist = false;
const client = redis.createClient();
client.on('connect', () => {
  exist = true;
});
client.on('error', (err) => {
  console.log('error', err);
});
client.quit();

const constructPhotoUrl = photo =>
  FLICKR_TEMPLATE_URL.replace(FARM_ID, photo.farm)
                     .replace(SERVER_ID, photo.server)
                     .replace(PHOTO_ID, photo.id)
                     .replace(PHOTO_SECRET, photo.secret);

// Fetches photos from Flickr for a given array of resources (destinations or events);
// Params: destinations/events array
// Returns: Destinations/events array, each object modified with additional property of
// photoUrl

const extendResourceWithPhotos = resources => {
  const optionsArray = resources.map(resource => ({
    uri: FLICKR_PHOTOSEARCH_URL,
    qs: {
      method: 'flickr.photos.search',
      api_key: process.env.FLICKR_PHOTOS_KEY,
      format: 'json',
      text: resource.location || resource.name,
      sort: 'interestingness-desc',
      media: 'photos',
      per_page: PHOTOS_TO_RETURN,
    },
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true, // Automatically parses the JSON string in the response
  }));

  return Promise.all(optionsArray.map((options, index) => {
    const key = `FLICKR_LOCATION_OR_EVENT:  ${options.qs.text}`;
    if (exist) {
      return redisUtils.isInRedis(key)
        .then(redisPhotos => {
          if (!redisPhotos) {
            return rp(options)
              .then(data => {
                data = JSON.parse(data.match(/^jsonFlickrApi\((.*)\)$/)[1]);
                const photos = data.photos.photo;
                redisUtils.createInRedis(key, photos);
                return photos;
              });
          }
          return JSON.parse(redisPhotos);
        })
        .then(photos => {
          const maxIndex = Math.min(photos.length, PHOTOS_TO_RETURN);
          const photo = photos[Math.floor(Math.random() * maxIndex)];
          const resource = resources[index];

          resource.photoUrl = constructPhotoUrl(photo);
          return resource;
        })
        .catch(err => err);
    }
    return rp(options)
      .then(data => {
        data = JSON.parse(data.match(/^jsonFlickrApi\((.*)\)$/)[1]);
        const photos = data.photos.photo;
        return photos;
      })
      .then(photos => {
        const maxIndex = Math.min(photos.length, PHOTOS_TO_RETURN);
        const photo = photos[Math.floor(Math.random() * maxIndex)];
        const resource = resources[index];

        resource.photoUrl = constructPhotoUrl(photo);
        return resource;
      })
      .catch(err => err);
  }));
};

module.exports = extendResourceWithPhotos;
