const Promise = require('bluebird');
const redis = require('redis');

module.exports = {
  isInRedis: key => {
    const client = redis.createClient();

    client.on('error', (err) => {
      console.log('error', err);
    });
    client.on('connect', () => {
      console.log('connected');
    });

    const redisGetAsync = Promise.promisify(client.get, { context: client });
    return redisGetAsync(key)
      .then(value => {
        client.quit();
        return value;
      });
  },

  createInRedis: (key, values) => {
    const client = redis.createClient();
    client.on('connect', () => {
      console.log('connected');
    });
    client.set(key, JSON.stringify(values), () => {
      client.quit();
    });
  },
};
