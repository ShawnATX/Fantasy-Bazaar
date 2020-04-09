const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bazaarSchema = new Schema({
    bazaarName: { 
        type: String, 
        required: true 
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    players: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
    requirePurchaseApproval: {
        type: Boolean,
        default: false
    },
    requireSaleApproval: {
        type: Boolean,
        default: false
    },
    requireWalletChangeApproval: {
        type: Boolean,
        default: false
    },
    system: {
        type: String,
        match: [({value}) => value === ("Pathfinder" || "DnD" || "Custom"), "Invalid system type"]
    },

});



const Bazaar = mongoose.model("Bazaar", bazaarSchema);

module.exports = Bazaar;
