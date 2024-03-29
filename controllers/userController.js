const db = require("../models");

//Controller methods for Users
const UserController = {
  findAll: function (req, res) {
    db.User.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User.findById(req.params.id)
      .then((dbModel) =>
        res.json({
          email: dbModel.email,
          characters: dbModel.characters,
          bazaars: dbModel.bazaars,
          id: dbModel._id,
        })
      )
      .catch((err) => res.status(422).json(err));
  },
  findByEmail: function (req, res) {
    db.User.findOne({ email: req.body.email }, "email")
      .lean()
      .then((dbModel) => {
        if (dbModel === null) {
          res.json(dbModel);
        } else {
          res.json("conflict");
        }
      })
      .catch((err) => {
        res.status(422).json(err);
      });
  },
  create: function (req, res) {
    db.User.create({ ...req.body })
      .then((dbModel) =>
        res.status(201).json({
          email: dbModel.email,
          characters: dbModel.characters,
          bazaars: dbModel.bazaars,
          id: dbModel._id,
        })
      )
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.User.findOneAndUpdate(req.params, req.body)
      .then((dbModel) =>
        res.json({
          email: dbModel.email,
          characters: dbModel.characters,
          bazaars: dbModel.bazaars,
          id: dbModel._id,
        })
      )
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) =>
        res.json({
          email: dbModel.email,
          characters: dbModel.characters,
          bazaars: dbModel.bazaars,
          id: dbModel._id,
        })
      )
      .catch((err) => res.status(422).json(err));
  },
};

module.exports = UserController;
