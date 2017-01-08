var Router = require('koa-router');

var router = new Router();

router.get('/login',  function* () {
  this.body = {};
});

module.exports = router;
