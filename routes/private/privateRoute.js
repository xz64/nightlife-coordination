var Router = require('koa-router');
const passport = require('passport');

var router = new Router();

router.get('/private',  function* () {
  console.log(this.req.user.id);
  this.body = {};
});

module.exports = router;
