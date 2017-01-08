const destroyable = require('server-destroy');
const http = require('http');
const koa = require('koa');

const conf = require('./config');
const router = require('./routes');

const app = koa();

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

