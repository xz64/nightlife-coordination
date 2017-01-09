const Router = require('koa-router');
const streamToPromise = require('stream-to-promise');

const googleMapsClient = require('../../googleMapsClient');

const router = new Router();

router.get('/photos/:id', function* () {
  const photo = yield googleMapsClient.findPhoto(this.params.id);
  const body = yield streamToPromise(photo);

  Object.keys(photo.headers).forEach(function(header) {
    this.set(header, photo.headers[header])
  }, this);

  this.body = body;
});

module.exports = router;
