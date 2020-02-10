const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/5084784d121512f0374d018c47a21d67/' +
    encodeURIComponent(latitude) +
    ',' +
    encodeURIComponent(longitude);

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find the location!', undefined);
    } else {
      const temperature = body.currently.temperature;
      const precipProb = body.currently.precipProbability;
      const summary = body.daily.data[0].summary;
      callback(
        undefined,
        `${summary} It is currently ${temperature} fahrenheit out. There is ${precipProb}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
