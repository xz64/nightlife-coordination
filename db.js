const mongoose = require('mongoose');

const conf = require('./config');

mongoose.Promise = Promise;

mongoose.connect(conf.get('mongodb_uri'));

const db = mongoose.connection;

module.exports = {
  open: function() {
    return new Promise(function(resolve, reject) {
      db.once('open', resolve);
    });
  },
  close: function() {
    mongoose.connection.close();
  }
};
