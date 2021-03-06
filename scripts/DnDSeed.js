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
            abilityReq: "Strength: 13"
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
            properties: "Thrown (range 20/60), Versatile (1d8)"
        }, 
        value: 1,
        weight: 3,
        type: "Weapon",
        subtype: "Simple Melee",
        system: "DnD"
    },
    {
        name: "Crossbow, light",
        description:{
            damage: "1d8 piercing",
            properties: "Ammunition (range 80/320), Loading, Two-handed"
        }, 
        value: 25,
        weight: 5,
        type: "Weapon",
        subtype: "Simple Ranged",
        system: "DnD"
    },
    {
        name: "Dart x20",
        description:{
            damage: "1d4 piercing",
            properties: "Thrown (range 20/60), Finesse"
        }, 
        value: 1,
        weight: 5,
        type: "Weapon",
        subtype: "Simple Ranged",
        system: "DnD"
    },
    {
        name: "Shortbow",
        description:{
            damage: "1d6 piercing",
            properties: "Ammunition (range 80/320), Two-handed"
        }, 
        value: 25,
        weight: 2,
        type: "Weapon",
        subtype: "Simple Ranged",
        system: "DnD"
    },
    {
        name: "Sling",
        description:{
            damage: "1d4 bludgeoning",
            properties: "Ammunition (range 30/120)"
        }, 
        value: 0.1,
        weight: 0,
        type: "Weapon",
        subtype: "Simple Ranged",
        system: "DnD"
    },
    {
        name: "Battleaxe",
        description:{
            damage: "1d8 slashing",
            properties: "Versatile (1d10)"
        }, 
        value: 10,
        weight: 4,
        type: "Weapon",
        subtype: "Martial Melee",
        system: "DnD"
    },
    {
        name: "Flail",
        description:{
            damage: "1d8 bludgeoning"
        }, 
        value: 10,
        weight: 2,
        type: "Weapon",
        subtype: "Martial Melee",
        system: "DnD"
    },
    {
        name: "Glaive",
        description:{
            damage: "1d10 slashing",
            properties: "Heavy, Reach, Two-handed"
        }, 
        value: 20,
        weight: 6,
        type: "Weapon",
        subtype: "Martial Melee",
        system: "DnD"
    },
    {
        name: "Greataxe",
        description:{
            damage: "1d12 slashing",
            properties: "Heavy, Two-handed"
        }, 
        value: 30,
        weight: 7,
        type: "Weapon",
        subtype: "Martial Melee",
        system: "DnD"
    },
    {
        name: "Greatsword",
        description:{
            damage: "2d6 slashing",
            properties: "Heavy, Two-handed"
        }, 
        value: 50,
        weight: 6,
        type: "Weapon",
        subtype: "Martial Melee",
        system: "DnD"
    },
    {
        name: "Halberd",
        description:{
            damage: "1d10 slashing",
            properties: "Heavy, Reach, Two-handed"
        }, 
        value: 20,
        weight: 6,
        type: "Weapon",
        subtype: "Martial Melee",
        system: "DnD"
    },
    {
        name: "Lance",
        description:{
            damage: "1d12 piercing",
            properties: "Reach, Special"
        }, 
        value: 10,
        weight: 6,
        type: "Weapon",
        subtype: "Martial Melee",
        system: "DnD"
    },
    {
        name: "Longsword",
        description:{
            damage: "1d8 slashing",
            properties: "Versatile (1d10)"
        }, 
        value: 15,
        weight: 3,
        type: "Weapon",
        subtype: "Martial Melee",
        system: "DnD"
    },
    {
        name: "Maul",
        description:{
            damage: "2d6 bludgeoning",
            properties: "Heavy, Two-handed"
        }, 
        value: 10,
        weight: 10,
        type: "Weapon",
        subtype: "Martial Melee",
        system: "DnD"
    },
    {
        name: "Morningstar",
        description:{
            damage: "1d8 piercing"
        }, 
        value: 15,
        weight: 4,
        type: "Weapon",
        subtype: "Martial Melee",
        system: "DnD"
    },
    {
        name: "Pike",
        description:{
            damage: "1d10 piercing",
            properties: "Heavy, Reach, Two-handed"
        }, 
        value: 5,
        weight: 18,
        type: "Weapon",
        subtype: "Martial Melee",
        system: "DnD"
    },
    {
        name: "Rapier",
        description:{
            damage: "1d8 piercing",
            properties: "Finesse"
        }, 
        value: 25,
        weight: 2,
        type: "Weapon",
        subtype: "Martial Melee",
        system: "DnD"
    },
    {
        name: "Scimitar",
        description:{
            damage: "1d6 slashing",
            properties: "Finesse, Light"
        }, 
        value: 25,
        weight: 3,
        type: "Weapon",
        subtype: "Martial Melee",
        system: "DnD"
    },
    {
        name: "Shortsword",
        description:{
            damage: "1d6 piercing",
            properties: "Finesse, Light"
        }, 
        value: 10,
        weight: 2,
        type: "Weapon",
        subtype: "Martial Melee",
        system: "DnD"
    },
    {
        name: "Trident",
        description:{
            damage: "1d6 piercing",
            properties: "Thrown (range 20/60), Versatile (1d8)"
        }, 
        value: 5,
        weight: 4,
        type: "Weapon",
        subtype: "Martial Melee",
        system: "DnD"
    },
    {
        name: "War pick",
        description:{
            damage: "1d8 piercing"
        }, 
        value: 5,
        weight: 2,
        type: "Weapon",
        subtype: "Martial Melee",
        system: "DnD"
    },
    {
        name: "Warhammer",
        description:{
            damage: "1d8 bludgeoning",
            properties: "Versatile (1d10)"
        }, 
        value: 15,
        weight: 2,
        type: "Weapon",
        subtype: "Martial Melee",
        system: "DnD"
    },
    {
        name: "Whip",
        description:{
            damage: "1d4 slashing",
            properties: "Finesse, Reach"
        }, 
        value: 2,
        weight: 3,
        type: "Weapon",
        subtype: "Martial Melee",
        system: "DnD"
    },
    {
        name: "Longbow",
        description:{
            damage: "1d8 piercing",
            properties: "Ammunition (150/600), Heavy, Two-handed"
        }, 
        value: 50,
        weight: 2,
        type: "Weapon",
        subtype: "Martial Ranged",
        system: "DnD"
    },
    {
        name: "Poison, vial",
        description:{
            description: "Add 1d4 Poison damage to a weapon for 1 minute"
        }, 
        value: 100,
        weight: 0,
        type: "Consumable",
        system: "DnD"
    }
];

function seedItems() {
    db.Item.collection.insertMany(itemSeed)
        .then(data => {
            console.log(data.result.n + " item records inserted!");
            process.exit(0);
            //seed user data once items finish inserting
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
}

seedItems();