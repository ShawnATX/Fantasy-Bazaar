const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemDescription = new Schema({
  ac: String,
  abilityReq: String,
  skillModifier: String,
  damage: String,
  properties: String,
  description: String,
});

const itemSchema = new Schema({
  name: { type: String, required: true },
  description: { itemDescription },
  value: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    validate: [
      ({ value }) =>
        value ===
        ("Weapon" ||
          "Armor" ||
          "Wearable" ||
          "Adventuring Gear" ||
          "Service" ||
          "Misc"),
      "Item type is invalid",
    ],
  },
  subtype: {
    type: String,
  },
  system: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  custom: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
