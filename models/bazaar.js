const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const nanoid = require("nanoid");

const InventoryItem = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: "Item",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const ItemStock = new Schema({
  items: [InventoryItem],
});

const BazaarSchema = new Schema({
  bazaarName: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  joinCode: {
    type: String,
    unique: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  requirePurchaseApproval: {
    type: Boolean,
    default: false,
  },
  requireSaleApproval: {
    type: Boolean,
    default: false,
  },
  requireWalletChangeApproval: {
    type: Boolean,
    default: false,
  },
  system: {
    type: String,
    match: [
      ({ value }) => value === ("Pathfinder" || "DnD" || "Custom"),
      "Invalid system type",
    ],
  },
  stock: { ItemStock },
});

BazaarSchema.methods.createJoinCode = function () {
  this.joinCode = () => nanoid(8);
  return joinCode;
};

//itemArr is expecting an array of objects, each object has properties for ObjectId(Item) and quantity(number)
BazaarSchema.methods.addInventory = function (itemArr) {
  itemArray.forEach((item) => {
    let newItem = new InventoryItem(item);
    this.stock = stock.push(newItem);
  });
  return this.stock;
};

const Bazaar = mongoose.model("Bazaar", BazaarSchema);

module.exports = Bazaar;
