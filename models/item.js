const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  value: {
      type: Number,
      required: true
  },
  weight: {
      type: Number,
      required: true
  },
  type: {
    type: String,
    required: true,
    validate: [({ value }) => value === ("Weapon" || "Armor" || "Wearable" || "Consumable" || "Gear" || "Kit" || "Service" || "Misc"), "Item type is invalid"]
  },
  system: {
    type: String,
    required: true
  },
  date: { type: Date, default: Date.now }
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
