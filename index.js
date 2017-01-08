const destroyable = require('server-destroy');
const http = require('http');
const koa = require('koa');
const passport = require('koa-passport');
const bodyParser = require('koa-bodyparser');
const session = require('koa-generic-session');

const db = require('./db');
const authStrategies = require('./authStrategies');
const conf = require('./config');
const router = require('./routes');

const app = koa();

app.keys = [conf.get('session_secret')];
app.use(session());

app.use(bodyParser());

authStrategies.forEach(function(authStrategy) {
  passport.use(authStrategy);
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.use(router.routes());
app.use(router.allowedMethods());

const server = http.createServer(app.callback())

destroyable(server);

function shutdown() {
  console.log('shutting down');
  db.close();
  server.destroy();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

db.open().then(function() {
  server.listen(conf.get('port'));
});
