const koa = require('koa');

const conf = require('./config');
const router = require('./routes');

const app = koa();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(conf.get('port'));
