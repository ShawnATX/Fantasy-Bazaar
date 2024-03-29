const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemDescription = new Schema({
  ac: String,
  abilityReq: String,
  skillModifier: String,
  damage: String,
  crit: String,
  properties: String,
  description: String,
  capacity: String,
  dexBonus: String,
  armorCheckPenalty: String,
  arcaneSpellFailure: String,
  spellLevel: Number,
  casterLevel: Number,
});

const valueSettings = new Schema({
  variablePrice: {
    type: Boolean,
    required: true,
    default: false,
  },
  minPrice: Number,
  maxPrice: Number,
});

const itemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: itemDescription, default: {} },
  value: {
    type: Number,
    required: true,
  },
  valueSettings: {
    type: valueSettings,
  },
  weight: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: [
      "Weapon",
      "Armor",
      "Wearable",
      "Adventuring Gear",
      "Service",
      "Misc",
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
