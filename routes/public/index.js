var Router = require('koa-router');

var authRouter = require('./auth');
var locationRouter = require('./location');

var router = new Router();

router.get('/public', function* () {
  this.body = { message: 'public', isAuthenticated: this.isAuthenticated() };
});

router.use('', authRouter.routes(), authRouter.allowedMethods());
router.use('', locationRouter.routes(), locationRouter.allowedMethods());

module.exports = router;
