var Router = require('koa-router');

var loginRouter = require('./login');

var router = new Router();

router.use('', loginRouter.routes(), loginRouter.allowedMethods());

module.exports = router;
