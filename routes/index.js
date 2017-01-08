var Router = require('koa-router');

var publicRouter = require('./public');

var router = new Router();

router.use('/api', publicRouter.routes(), publicRouter.allowedMethods());

module.exports = router;
