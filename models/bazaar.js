const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BazaarSchema = new Schema({
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
    joinCode: {
        type: String,
        unique: true,
        required: true,
        uppercase: true
    },
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
    }

});

BazaarSchema.methods.createJoinCode = function() {
    this.joinCode = shortid.generate();
    console.log(this.joinCode);
}


const Bazaar = mongoose.model("Bazaar", BazaarSchema);

module.exports = Bazaar;
