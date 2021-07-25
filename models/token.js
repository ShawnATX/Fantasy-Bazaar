const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    expires: "4140s",
  },
});

tokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 4140 });

module.exports = mongoose.model("Token", tokenSchema);
