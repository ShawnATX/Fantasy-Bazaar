const mongoose = require("mongoose");
const db = require("../models");
const shortid = require('shortid');


//This file is used to initialize standard data for the application: items, admin user, example bazaar
mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/fantasybazaar"
);

const itemSeed = [
    {
        name: "Potion of Healing",
        description: {
            description: "A magical potion which heals 2d4 +2 hit points to the user"
        },
        value: 50,
        weight: 0.5,
        type: "Consumable",
        system: "DnD",
        subtype: "Potion"
    }
];
const userSeed = [
    {
        userName: "GM",
        characterName: "GM",
        wallet: 0,
        type: "GM",
        password: "pass",
        bazaars: []
    },
    {
        userName: "glasscannon",
        characterName: "Pembrick",
        wallet: 25,
        type: "Player",
        items: [],
        bazaars: []
    }
]
const bazaarSeed = [
    {
        bazaarName: "First World Junk",
        creator: {},
        players: [],
        system: "DnD"
        // , joinCode: shortid.generate()
        , joinCode: "V5k0sfZWi" //previously generated join code
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

    db.User.findOne({ userName: "glasscannon" }, '_id', function (err, userId) {
        bazaarSeed[0].players.push(userId);
    })
    .then( () => {
        db.User.findOne({userName: "GM" }, '_id', function(err, userId) {
            console.log(userId);
            bazaarSeed[0].creator = userId;
        })
        .then( () => {
            db.Bazaar
                .remove({})
                .then(() =>
                    //console.log(bazaarSeed.joinCode);
                    db.Bazaar.collection.insertMany(bazaarSeed)
                )
                .then(data => {
                    console.log(data.insertedIds[0]);
                    console.log(data.result.n + " bazaar records inserted!");
                    db.User.findOneAndUpdate({ _id: bazaarSeed[0].creator }, { bazaars: [data.insertedIds[0]] })
                        .then((data) => {
                            console.log(data + "GM updated");
                        })
                        .then(() => {
                            process.exit(0);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    console.error(err);
                    process.exit(1);
                });
        })
        .catch((err) => {
            console.log(err)
        })
    })
}

seedItems();