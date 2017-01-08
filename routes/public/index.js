var Router = require('koa-router');

var authRouter = require('./auth');

var router = new Router();

router.get('/public', function* () {
  this.body = { message: 'public', isAuthenticated: this.isAuthenticated() };
});

router.use('', authRouter.routes(), authRouter.allowedMethods());

module.exports = router;
