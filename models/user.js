const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    characterName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        match: [({ value }) => value === ("GM" || "Player"), "Invalid user type"]
    },
    wallet: {
        type: Number,
        required: true
    },
    priceModifier: {
        type: Number,
        required: true,
        default: 1
    },
    date: {
        type: Date,
        default: Date.now
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: "Item"
        }
    ]

});



const User = mongoose.model("User", userSchema);

module.exports = User;
