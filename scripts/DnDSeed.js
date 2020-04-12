const mongoose = require("mongoose");
const db = require("../models");

//This file is used to initialize standard data for the application: items, admin user, example bazaar
mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/fantasybazaar"
);

const itemSeed = [
    {
        name: "Padded",
        description:{
            ac: "11 + Dex Mod",
            skillModifier: "Stealth: Disadvantage"
        }, 
        value: 5,
        weight: 8,
        type: "Armor",
        subtype: "Light Armor",
        system: "DnD"
    },
    {
        name: "Leather",
        description:{
            ac: "11 + Dex Mod"
        }, 
        value: 10,
        weight: 10,
        type: "Armor",
        subtype: "Light Armor",
        system: "DnD"
    },
    {
        name: "Studded Leather",
        description:{
            ac: "12 + Dex Mod"
        }, 
        value: 45,
        weight: 13,
        type: "Armor",
        subtype: "Light Armor",
        system: "DnD"
    },
    {
        name: "Hide",
        description:{
            ac: "12 + Dex Mod(max 2)"
        }, 
        value: 10,
        weight: 12,
        type: "Armor",
        subtype: "Medium Armor",
        system: "DnD"
    },
    {
        name: "Chain Shirt",
        description:{
            ac: "13 + Dex Mod(max 2)"
        }, 
        value: 50,
        weight: 20,
        type: "Armor",
        subtype: "Medium Armor",
        system: "DnD"
    },
    {
        name: "Scale Mail",
        description:{
            ac: "14 + Dex Mod(max 2)",
            skillModifier: "Stealth: Disadvantage"
        }, 
        value: 50,
        weight: 45,
        type: "Armor",
        subtype: "Medium Armor",
        system: "DnD"
    },
    {
        name: "Breastplate",
        description:{
            ac: "14 + Dex Mod(max 2)",
        }, 
        value: 400,
        weight: 20,
        type: "Armor",
        subtype: "Medium Armor",
        system: "DnD"
    },
    {
        name: "Half Plate",
        description:{
            ac: "15 + Dex Mod(max 2)",
            skillModifier: "Stealth: Disadvantage"
        }, 
        value: 750,
        weight: 40,
        type: "Armor",
        subtype: "Medium Armor",
        system: "DnD"
    },
    {
        name: "Ring Mail",
        description:{
            ac: "14",
            skillModifier: "Stealth: Disadvantage"
        }, 
        value: 30,
        weight: 40,
        type: "Armor",
        subtype: "Heavy Armor",
        system: "DnD"
    },
    {
        name: "Chain Mail",
        description:{
            ac: "16",
            skillModifier: "Stealth: Disadvantage",
            ailityReq: "Strength: 13"
        }, 
        value: 75,
        weight: 55,
        type: "Armor",
        subtype: "Heavy Armor",
        system: "DnD"
    },
    {
        name: "Splint",
        description:{
            ac: "17",
            skillModifier: "Stealth: Disadvantage",
            abilityReq: "Strength: 15"

        }, 
        value: 200,
        weight: 60,
        type: "Armor",
        subtype: "Heavy Armor",
        system: "DnD"
    },
    {
        name: "Full Plate",
        description:{
            ac: "18",
            skillModifier: "Stealth: Disadvantage",
            abilityReq: "Strength: 15"
        }, 
        value: 1500,
        weight: 65,
        type: "Armor",
        subtype: "Heavy Armor",
        system: "DnD"
    },
    {
        name: "Shield",
        description:{
            ac: "AC +2",
        }, 
        value: 10,
        weight: 6,
        type: "Armor",
        subtype: "Shield",
        system: "DnD"
    },
    {
        name: "Club",
        description:{
            damage: "1d4 bludgeoning",
            properties: "Light"
        }, 
        value: 0.1,
        weight: 2,
        type: "Weapon",
        subtype: "Simple Melee",
        system: "DnD"
    },
    {
        name: "Dagger",
        description:{
            damage: "1d4 piercing",
            properties: "Light, Finesse, Thrown(range 20/60)"
        }, 
        value: 2,
        weight: 1,
        type: "Weapon",
        subtype: "Simple Melee",
        system: "DnD"
    },
    {
        name: "Greatclub",
        description:{
            damage: "1d8 bludgeoning",
            properties: "Two-Handed"
        }, 
        value: 0.2,
        weight: 10,
        type: "Weapon",
        subtype: "Simple Melee",
        system: "DnD"
    },
    {
        name: "Handaxe",
        description:{
            damage: "1d6 slashing",
            properties: "Light, Thrown(range 20/60)"
        }, 
        value: 5,
        weight: 2,
        type: "Weapon",
        subtype: "Simple Melee",
        system: "DnD"
    },
    {
        name: "Javelin",
        description:{
            damage: "1d6 piercing",
            properties: "Thrown(range 30/120)"
        }, 
        value: 0.5,
        weight: 2,
        type: "Weapon",
        subtype: "Simple Melee",
        system: "DnD"
    },
    {
        name: "Light hammer",
        description:{
            damage: "1d4 bludgeoning",
            properties: "Light, Thrown(range 20/60)"
        }, 
        value: 2,
        weight: 2,
        type: "Weapon",
        subtype: "Simple Melee",
        system: "DnD"
    },
    {
        name: "Mace",
        description:{
            damage: "1d6 bludgeoning",
        }, 
        value: 5,
        weight: 4,
        type: "Weapon",
        subtype: "Simple Melee",
        system: "DnD"
    },
    {
        name: "Quarterstaff",
        description:{
            damage: "1d6 bludgeoning",
            properties: "Versatile(1d8)"
        }, 
        value: 0.2,
        weight: 4,
        type: "Weapon",
        subtype: "Simple Melee",
        system: "DnD"
    },
    {
        name: "Sickle",
        description:{
            damage: "1d4 slashing",
            properties: "Light"
        }, 
        value: 1,
        weight: 2,
        type: "Weapon",
        subtype: "Simple Melee",
        system: "DnD"
    },
    {
        name: "Spear",
        description:{
            damage: "1d6 piercing",
            properties: "Thrown(range 20/60), versatile(1d8)"
        }, 
        value: 1,
        weight: 3,
        type: "Weapon",
        subtype: "Simple Melee",
        system: "DnD"
    },

];


function seedItems() {
    db.Item.collection.insertMany(itemSeed)
        .then(data => {
            console.log(data.result.n + " item records inserted!");
            //seed user data once items finish inserting
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
}

seedItems();