var Router = require('koa-router');
const passport = require('passport');

var router = new Router();

router.get('/login/github', passport.authenticate('github'));

router.get('/login/github_callback', passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/unauthorized'
}));

router.get('/logout', function* () {
  this.session = null;
  this.body = {};
});

module.exports = router;
