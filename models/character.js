const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const characterSchema = new Schema({
  characterName: {
    type: String,
    required: true,
  },
  characterImage: {
    type: String,
  },
  wallet: {
    type: Number,
    required: true,
  },
  priceModifier: {
    type: Number,
    required: true,
    default: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  bazaar: {
    type: Schema.Types.ObjectId,
    ref: "Bazaar",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
