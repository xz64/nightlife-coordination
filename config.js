var convict = require('convict');

var conf = convict({
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT'
  },
  mongodb_uri: {
    doc: 'the mongodb uri',
    default: 'mongodb://localhost:27017/nightlife',
    env: 'MONGODB_URI'
  },
  github_client_id: {
    doc: 'github client id',
    default: '',
    env: 'GITHUB_CLIENT_ID'
  },
  github_client_secret: {
    doc: 'github client secret',
    default: '',
    env: 'GITHUB_CLIENT_SECRET'
  },
  github_callback_url: {
    doc: 'github callback url',
    default: '',
    env: 'GITHUB_CALLBACK_URL'
  }
});

conf.validate({strict: true});

module.exports = conf;
