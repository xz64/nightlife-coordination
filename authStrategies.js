const conf = require('./config');

const GitHubStrategy = require('passport-github').Strategy;

const strategies = [
  /*
  new GitHubStrategy({
    clientID: conf.get('github_client_id'),
    clientSecret: conf.get('github_client_secret'),
    callbackURL: conf.get('github_callbaack_url')
  });
  */
];

module.exports = strategies;
