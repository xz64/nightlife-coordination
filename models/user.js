const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = mongoose.Schema({
  id: { type: String, unique: true }
});

userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

module.exports = User;
