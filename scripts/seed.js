const mongoose = require("mongoose");
const db = require("../models");

//This file is used to initialize standard data for the application: items, admin user, example bazaar
mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/fantasybazaar"
);

const itemSeed = [
    {
        name: "Potion of Healing",
        description: "A magical potion which heals 1d6 hit points to the user",
        value: 50,
        weight: 0.5,
        type: "Consumable",
        system: "DnD"
    }

];
const userSeed = [
    {
        userName: "GM",
        characterName: "Overlord",
        wallet: 0,
        type: "GM"
    },
    {
        userName: "glass cannon",
        characterName: "Pembrick",
        wallet: 25,
        type: "Player",
        items: []
    }
]
const bazaarSeed =[
    {
        bazaarName: "First World Junk",
        creator: {},
        system: "DnD"
    }
];

function seedItems() {
    db.Item
        .remove({})
        .then(() => db.Item.collection.insertMany(itemSeed))
        .then(data => {
            console.log(data.result.n + " item records inserted!");
            //seed user data once items finish inserting
            seedUsers();
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
}

const seedUsers = () => {
    //add seeded item to players item list


    db.User
        .remove({})
        .then(() => db.User.collection.insertMany(userSeed))
        .then(data => {
            console.log(data.result.n + " user records inserted!");
            seedBazaar();
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
}

const seedBazaar = () => {
    //get GM user to seed as bazaar creator
    db.User.findOne({userName: "GM"}, '_id', function (err, userId) {
        bazaarSeed[0].creator = userId;
    })
    db.Bazaar
    .remove({})
    .then(() => db.Bazaar.collection.insertMany(bazaarSeed))
    .then(data => {
        console.log(data.result.n + " bazaar records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
}


seedItems();