var Router = require('koa-router');
var HttpStatus = require('http-status-codes');

const attendanceRouter = require('./attendanceRoute');

var router = new Router();

router.use(function* (next) {
  if (!this.isAuthenticated()) {
    this.status = HttpStatus.UNAUTHORIZED;
    return;
  }
  yield next;
});

router.use('', attendanceRouter.routes(), attendanceRouter.allowedMethods());

module.exports = router;
