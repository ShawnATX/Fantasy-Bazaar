const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ["Sale", "Purchase", "Wallet+", "Wallet-", "Custom Item"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  character: {
    type: Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
  bazaar: {
    type: Schema.Types.ObjectId,
    ref: "Bazaar",
    required: true,
  },
  cleared: {
    type: Boolean,
    required: true,
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: "Item",
  },
  walletDelta: {
    type: Number,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
