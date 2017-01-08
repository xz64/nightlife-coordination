var Router = require('koa-router');

const privateRouter = require('./privateRoute');

var router = new Router();

router.use(function* (next) {
  if (!this.isAuthenticated()) {
    return this.redirect('/api/login/github');
  }
  yield next;
});

router.use('', privateRouter.routes(), privateRouter.allowedMethods());

module.exports = router;
