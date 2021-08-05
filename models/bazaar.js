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
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
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
  requireNewCharacterApproval: {
    type: Boolean,
    default: true,
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
  limitedInventoryItems: {
    type: Boolean,
    default: false,
  },
  limitedInventoryQuantity:{
    type: Boolean,
    default: false
  },
  stockSoldItems: {
    type: Boolean,
    default: false,
  },
  system: {
    type: String,
    required: true,
  },
  stock: [
    {
      type: InventoryItem,
    },
  ],
});

//itemArr is expecting an array of objects, each object has properties for ObjectId(Item) and quantity(number)
bazaarSchema.methods.addInventory = function (itemArr) {
  itemArr.forEach(function (item) {
    var newItem = new InventoryItem(item);
    console.log(newItem);
    this.stock = stock.push(newItem);
  }, bazaarSchema);
  return this.stock;
};

bazaarSchema.methods.getInventory = function () {
  return this.stock;
};

const Bazaar = mongoose.model("Bazaar", bazaarSchema);

module.exports = Bazaar;
