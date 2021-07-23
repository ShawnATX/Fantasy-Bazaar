const db = require("../models");

const TransactionController = {
  findAll: function (req, res) {
    db.Transaction.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findAllByBazaar: function (req, res) {
    db.Transaction.find({ bazaar: req.params.bazaarid })
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findAllUnclearedByBazaar: function (req, res) {
    db.Transaction.find({ bazaar: req.params.bazaarid, cleared: false })
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findAllByCharacter: function (req, res) {
    db.Transaction.find({ character: req.params.characterid })
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findAllUnclearedByCharacter: function (req, res) {
    db.Transaction.find({ character: req.params.characterid, cleared: false })
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  findAll: function (req, res) {
    db.Transaction.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Transaction.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Transaction.create(req.body)
      .then((dbModel) => res.status(201).json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  clear: function (req, res) {
    db.Transaction.findOneAndUpdate(
      { _id: req.body.id },
      { cleared: true },
      { new: true }
    );
  },
  clearMany: function (req, res) {
    db.Transaction.where("_id")
      .in(req.body.transactions)
      .updateMany({}, { $set: { cleared: true } })
      .then((dbModels) => {
        res.json("Success");
      })
      .catch((err) => res.status(422).json(err));
  },
};

module.exports = TransactionController;
