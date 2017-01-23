const Router = require('koa-router');
const HttpStatus = require('http-status-codes');
const mongoose = require('mongoose');

const Place = require('../../models/place');
const googleMapsClient = require('../../googleMapsClient');

const router = new Router();

router.get('/places', function* () {
  const loc = this.query['loc'];
  if (!loc) {
    this.status = HttpStatus.BAD_REQUEST;
    return;
  }
  const results = yield googleMapsClient.findRestaurants(loc);
  const ids = results.map(function(result) {
    return result.id;
  });
  const userId = this.req.user && this.req.user._id;
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const existingPlaces = yield Place.find({
    id: { $in: ids }
  }).exec();
  const existingPlacesMap = {};
  existingPlaces.forEach(function(place) {
    var amGoing = false;

    for (var i = 0; i < place.goers.length; i++) {
      if (place.goers[i].equals(userObjectId)) {
        amGoing = true;
        break;
      }
    }

    existingPlacesMap[place.id] = {
      amGoing: amGoing,
      numGoing: place.goers.length
    };
  });
  this.body = results.map(function(result) {
    return {
      id: result.id,
      name: result.name,
      photo_reference: result.photos && result.photos[0].photo_reference,
      description: result.vicinity,
      amGoing: (existingPlacesMap[result.id] && existingPlacesMap[result.id].amGoing) || false,
      numGoing: (existingPlacesMap[result.id] && existingPlacesMap[result.id].numGoing) || 0
    };
  });
});

module.exports = router;
