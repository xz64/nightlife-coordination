const cron = require('cron');
const Place = require('./models/place');

const cleanGoersJob = new cron.CronJob({
  cronTime: '0 1 * * *',
  onTick: function() {
    Place.remove({}).exec();
  }
});

module.exports = {
  start: function() {
    cleanGoersJob.start();
  },
  stop: function() {
    cleanGoersJob.stop();
  }
};
