const koa = require('koa');

const conf = require('./config');

const app = koa();

app.listen(conf.get('port'));
