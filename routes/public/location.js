const Router = require('koa-router');
const HttpStatus = require('http-status-codes');

const router = new Router();

const googleMapsClient = require('../../googleMapsClient');

router.get('/places', function* () {
  const loc = this.query['loc'];
  if (!loc) {
    this.status = HttpStatus.BAD_REQUEST;
    return;
  }
  const results = yield googleMapsClient.findRestaurants(loc);
  this.body = results.map(function(result) {
    return {
      id: result.id,
      name: result.name,
      photo_reference: result.photos && result.photos[0].photo_reference,
      description: result.vicinity
    };
  });
});

module.exports = router;
