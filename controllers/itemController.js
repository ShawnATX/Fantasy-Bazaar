const db = require("../models");

//Controller methods for Items
const ItemController = {
  findAll: function (req, res) {
    db.Item.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findAllBySystem: function (req, res) {
    db.Item.find(req.params)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Item.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findManyById: function (req, res) {
    db.Item.find()
      .where("_id")
      .in(req.body.items)
      .then((dbModels) => res.json(dbModels))
      //.then(dbModels => res.json(dbModels))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Item.create(req.body)
      .then((dbModel) => res.status(201).json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  addCustom: function (req, res) {
    console.log(req.body);
    db.Item.create(req.body.item)
      .then((dbModel) => {
        db.Bazaar.findById(req.body.bazaar)
          .addInventory({ item: dbModel._id })
          .then()
          .catch((err) => res.status(422).json(err));
        res.status(201).json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },

  update: function (req, res) {
    db.Item.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Item.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};

module.exports = ItemController;
