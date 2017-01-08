const GitHubStrategy = require('passport-github').Strategy;

const User = require('./models/user');
const conf = require('./config');

const strategies = [
  new GitHubStrategy({
    clientID: conf.get('github_client_id'),
    clientSecret: conf.get('github_client_secret'),
    callbackURL: conf.get('github_callback_url')
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ id: profile.id }, function(err, user) {
      return cb(err, user);
    })
  })
];

module.exports = strategies;
