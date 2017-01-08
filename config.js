var convict = require('convict');

var conf = convict({
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT'
  }
});

conf.validate({strict: true});

module.exports = conf;
