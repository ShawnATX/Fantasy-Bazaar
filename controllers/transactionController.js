const db = require("../models");

const TransactionController = {
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
    db.Transaction.updateMany()
      .where("_id")
      .in(req.body.transactions)
      .then((dbModels) => {
        res.json("Success");
      })
      .catch((err) => res.status(422).json(err));
  },
};
