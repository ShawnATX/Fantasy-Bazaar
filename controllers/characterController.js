const { Character, Item } = require("../models");
const db = require("../models");

const CharacterController = {
  findAll: function (req, res) {
    db.Character.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Character.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findManyById: function (req, res) {
    db.Character.find()
      .where("_id")
      .in(req.body)
      .then((dbModels) => res.json(dbModels))
      .catch((err) => res.status(422).json(err));
  },
  //create new character, then add character to the users list of characters, then add the character to a bazaars list of characters
  create: function (req, res) {
    db.Character.create({ ...req.body })
      .then((characterModel) => {
        db.User.findOneAndUpdate(
          { _id: req.body.owner },
          { $push: { characters: characterModel._id } },
          { new: true }
        )
          .then((dbModel) => {
            db.Bazaar.findOneAndUpdate(
              { _id: characterModel.bazaar },
              { $push: { characters: characterModel._id } },
              { new: true }
            )
              .then(() => {
                res.status(201).json(dbModel);
              })
              .catch((err) => res.status(422).json(err));
          })
          .catch((err) => res.status(422).json(err));
      })
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Character.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .then((dbModel) => {
        res.status(200).json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
  updateWallet: function (req, res) {
    if (req.body.trx) {
      db.Character.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { wallet: req.body.wallet },
          $set: { pendingApproval: true },
        },
        {
          new: true,
        }
      )
        .then((dbModel) => {
          db.Transaction.create({
            type: "Wallet",
            character: dbModel._id,
            bazaar: dbModel.bazaar,
            cleared: false,
            walletDelta: req.body.wallet,
          }).catch((err) => console.log(err));
          res.status(200).json(dbModel.wallet);
        })
        .catch((err) => res.status(422).json(err));
    } else {
      db.Character.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { wallet: req.body.wallet },
        },
        {
          new: true,
        }
      )
        .then((dbModel) => {
          res.status(200).json(dbModel.wallet);
        })
        .catch((err) => res.status(422).json(err));
    }
  },
  //route specifically for adding item to character item list and decrementing gold. This returns the newly modified user doc (not the default unmodified doc)
  purchase: function (req, res) {
    if (req.body.trx) {
      db.Item.findById(req.body.items[0], "value")
        .then((dbModel) => {
          let price = dbModel.value * -1;
          db.Character.findOneAndUpdate(
            { _id: req.body.character },
            {
              $push: { items: req.body.items[0] },
              $inc: { wallet: price },
              $set: { pendingApproval: true },
            },
            { new: true }
          )
            .then((dbModel) => {
              db.Transaction.create({
                type: "Purchase",
                item: req.body.items[0],
                character: dbModel._id,
                bazaar: dbModel.bazaar,
                cleared: false,
                walletDelta: price,
              }).catch((err) => console.log(err));
              res.json(dbModel);
            })
            .catch((err) => res.status(422).json(err));
        })
        .catch((err) => res.status(422).json(err));
    } else {
      db.Item.findById(req.body.items[0], "value")
        .then((dbModel) => {
          let price = dbModel.value * -1;
          db.Character.findOneAndUpdate(
            { _id: req.body.character },
            {
              $push: { items: req.body.items[0] },
              $inc: { wallet: price },
            },
            { new: true }
          )
            .then((dbModel) => {
              res.json(dbModel);
            })
            .catch((err) => res.status(422).json(err));
        })
        .catch((err) => res.status(422).json(err));
    }
  },
  //route specifically for updating character item array with a new array and incrementing gold. This returns the newly modified user doc (not the default unmodified doc)
  sell: function (req, res) {
    console.log(req.body);
    if (req.body.trx) {
      db.Item.findById(req.body.soldItem, "value")
        .then((dbModel) => {
          let price = dbModel.value;
          db.Character.findOneAndUpdate(
            { _id: req.body.character },
            {
              $set: { items: req.body.items, pendingApproval: true },
              $inc: { wallet: price },
            },
            { new: true }
          )
            .then((dbModel) => {
              db.Transaction.create({
                type: "Sale",
                item: req.body.soldItem,
                character: dbModel._id,
                bazaar: dbModel.bazaar,
                cleared: false,
                walletDelta: price,
              }).catch((err) => console.log(err));
              res.json(dbModel);
            })
            .catch((err) => res.status(422).json(err));
        })
        .catch((err) => res.status(422).json(err));
    } else {
      db.Item.findById(req.body.soldItem, "value")
        .then((dbModel) => {
          let price = dbModel.value;
          db.Character.findOneAndUpdate(
            { _id: req.body.character },
            {
              $set: { items: req.body.items },
              $inc: { wallet: price },
            },
            { new: true }
          )
            .then((dbModel) => {
              res.json(dbModel);
            })
            .catch((err) => res.status(422).json(err));
        })
        .catch((err) => res.status(422).json(err));
    }
  },
  //route specificallt for adding items in bulk (for character creation)
  addItems: function (req, res) {
    db.Character.findOneAndUpdate(
      { _id: req.character._id },
      {
        $set: { items: req.body.items },
      },
      { new: true }
    )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  remove: function (req, res) {
    db.Character.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};

module.exports = CharacterController;
