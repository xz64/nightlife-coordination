var Router = require('koa-router');
const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');
const passport = require('passport');

const Place = require('../../models/place');

var router = new Router();

router.post('/register',  function* () {
  const placeId = this.request.body.id;
  var place = yield Place.findOne({ id: placeId });
  if (!place) {
    place = new Place({
      id: placeId
    });
    yield place.save();
  }

  var userId = this.req.user._id;
  if (place.goers.indexOf(userId) === -1) {
    place.goers.push(this.req.user._id);
    yield place.save();
  }

  this.body = {};
});

router.post('/unregister', function* () {
  const placeId = this.request.body.id;
  const userId = this.req.user._id;
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const place = yield Place.findOne({
    id: placeId,
    goers: userObjectId
  });
  if (!place) {
    this.status = HttpStatus.BAD_REQUEST;
    return;
  }

  place.goers.pull(userObjectId);

  yield place.save();

  this.body = {};
});

module.exports = router;
