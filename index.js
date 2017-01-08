const destroyable = require('server-destroy');
const http = require('http');
const koa = require('koa');
const passport = require('koa-passport');
const bodyParser = require('koa-bodyparser');

const authStrategies = require('./authStrategies');
const conf = require('./config');
const router = require('./routes');

const app = koa();

app.use(bodyParser());

authStrategies.forEach(function(authStrategy) {
  passport.use(authStrategy);
});

app.use(passport.initialize());

app.use(router.routes());
app.use(router.allowedMethods());

const server = http.createServer(app.callback())

destroyable(server);

function shutdown() {
  console.log('shutting down');
  server.destroy();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

server.listen(conf.get('port'));

