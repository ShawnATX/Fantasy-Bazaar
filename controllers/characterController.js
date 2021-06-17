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
        // console.log(characterModel);
        db.User.findOneAndUpdate(
          { _id: req.body.owner },
          { $push: { characters: characterModel._id } },
          { new: true }
        )
          .then((dbModel) => {
            console.log(characterModel);
            db.Bazaar.findOneAndUpdate(
              { _id: characterModel.bazaar },
              { $push: { characters: characterModel._id } },
              { new: true }
            )
              .then(() => {
                res.json(dbModel);
              })
              .catch((err) => res.status(422).json(err));
          })
          .catch((err) => res.status(422).json(err));
      })
      .catch((err) => res.status(422).json(err));
  },

  update: function (req, res) {
    db.Character.findOneAndUpdate(req.params, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  //route specifically for adding item to character item list and decrementing gold. This returns the newly modified user doc (not the default unmodified doc)
  purchase: function (req, res) {
    db.Character.findOneAndUpdate(
      { _id: req.body.character },
      {
        $push: { items: req.body.items[0] },
        $set: { wallet: req.body.wallet },
      },
      { new: true }
    )
      .then((dbModel) => {
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
  //route specifically for updating character item array with a new array and incrementing gold. This returns the newly modified user doc (not the default unmodified doc)
  sell: function (req, res) {
    db.Character.findOneAndUpdate(
      { _id: req.body.character },
      {
        $set: { items: req.body.items, wallet: req.body.wallet },
      },
      { new: true }
    )
      .then((dbModel) => {
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
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