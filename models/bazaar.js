const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const generate = require("nanoid-generate");

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

const bazaarSchema = new Schema({
  bazaarName: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  characters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Character",
    },
  ],
  joinCode: {
    type: String,
    unique: true,
    required: true,
    default: () => {
      return generate.lowercase(8);
    },
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
  requireWalletAdditionApproval: {
    type: Boolean,
    default: false,
  },
  requireCustomItemApproval: {
    type: Boolean,
    default: false,
  },
  limitedInventory: {
    type: Boolean,
    default: false,
  },
  system: {
    type: String,
    required: true,
  },
  stock: { ItemStock },
});

//itemArr is expecting an array of objects, each object has properties for ObjectId(Item) and quantity(number)
bazaarSchema.methods.addInventory = function (itemArr) {
  itemArray.forEach((item) => {
    let newItem = new InventoryItem(item);
    this.stock = stock.push(newItem);
  });
  return this.stock;
};

const Bazaar = mongoose.model("Bazaar", bazaarSchema);

module.exports = Bazaar;
