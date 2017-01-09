var Router = require('koa-router');
var HttpStatus = require('http-status-codes');

var publicRouter = require('./public');
var privateRouter = require('./private');

var router = new Router();

router.post('*', function* (next) {
  if (this.request.headers['x-requested-with'] !== 'XMLHttpRequest') {
    // csrf protection
    this.response.status = HttpStatus.BAD_REQUEST;
    this.body = { error: 'missing CSRF header (X-Requested-With: '
      + 'XMLHttpRequest)' };
    return;
  }
  yield next;
});

router.use('/api', publicRouter.routes(), publicRouter.allowedMethods());

router.use('/api', privateRouter.routes(), privateRouter.allowedMethods());

module.exports = router;
