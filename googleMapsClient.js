const conf = require('./config');

const googleMapsClient = require('@google/maps').createClient({
  Promise: Promise,
  key: conf.get('googleApiKey')
});

function geocode(place) {
  return googleMapsClient.geocode({
    address: place
  }).asPromise();
}

function findRestaurantsByCoords(latlng) {
  return googleMapsClient.placesNearby({
    language: 'en',
    location: latlng,
    radius: 16000,
    type: 'restaurant'
  }).asPromise();
}

function findRestaurants(place) {
  return geocode(place)
    .then(function(response) {
      const res = response.json.results;
      if (!res || res.length === 0) {
        return null;
      }
      const latlng = res[0].geometry.location;
      return findRestaurantsByCoords(latlng);
    })
    .then(function(response) {
      return response.json.results;
    });
}

module.exports = {
  findRestaurants: findRestaurants
};
