const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const placeSchema = mongoose.Schema({
  id: { type: String, unique: true },
  goers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

placeSchema.plugin(findOrCreate);

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
