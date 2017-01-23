var Router = require('koa-router');
var HttpStatus = require('http-status-codes');

var authRouter = require('./auth');
var locationRouter = require('./location');
var photoRouter = require('./photo');

var router = new Router();

router.get('/unauthorized', function* () {
  this.status = HttpStatus.UNAUTHORIZED;
});

router.use('', authRouter.routes(), authRouter.allowedMethods());
router.use('', locationRouter.routes(), locationRouter.allowedMethods());
router.use('', photoRouter.routes(), photoRouter.allowedMethods());

module.exports = router;
