const request = require('request');

const weather = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/83958f12a85de59d55e20301ab20411c/' +
    encodeURIComponent(latitude) +
    ',' +
    encodeURIComponent(longitude);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to retrieve info!');
    } else if (body.error) {
      callback('Unable to find location! Try another search', undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          'It is currently ' +
          body.currently.temperature +
          '. There is a ' +
          body.currently.precipProbability +
          '% chance of rain.'
      );
    }
  });
};

module.exports = weather;
