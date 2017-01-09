var Router = require('koa-router');

var authRouter = require('./auth');
var locationRouter = require('./location');
var photoRouter = require('./photo');

var router = new Router();

router.get('/public', function* () {
  this.body = { message: 'public', isAuthenticated: this.isAuthenticated() };
});

router.use('', authRouter.routes(), authRouter.allowedMethods());
router.use('', locationRouter.routes(), locationRouter.allowedMethods());
router.use('', photoRouter.routes(), photoRouter.allowedMethods());

module.exports = router;
