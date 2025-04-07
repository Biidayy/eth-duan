const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  amount: { type: String, required: true },
  gasUsed: { type: Number, required: true },
  fee: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
