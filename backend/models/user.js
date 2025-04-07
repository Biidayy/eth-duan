const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  walletAddress: String,
  privateKey: String,
});

module.exports = mongoose.model('User', userSchema);
