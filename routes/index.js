var Router = require('koa-router');

var publicRouter = require('./public');
var privateRouter = require('./private');

var router = new Router();

router.use('/api', publicRouter.routes(), publicRouter.allowedMethods());

router.use('/api', privateRouter.routes(), privateRouter.allowedMethods());

module.exports = router;
