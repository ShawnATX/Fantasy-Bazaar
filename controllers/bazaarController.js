const db = require("../models");

//Controller methods for Bazaars
const BazaarController = {
  findAll: function (req, res) {
    db.Bazaar.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findByJoinCode: function (req, res) {
    db.Bazaar.findOne({ joinCode: req.params.joinCode })
      .then((dbModel) => {
        response = {
          name: dbModel.bazaarName,
          id: dbModel._id,
          system: dbModel.system,
        };
        res.json(response);
      })
      .catch((err) => res.status(422).json(err));
  },
  findManyById: function (req, res) {
    db.Bazaar.find()
      .where("_id")
      .in(req.body)
      .then((dbModels) => res.json(dbModels))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Bazaar.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Bazaar.create(req.body)
      .then((dbModel) => {
        db.User.findOneAndUpdate(
          { _id: dbModel.creator },
          { $push: { bazaars: dbModel._id } },
          { new: true }
        )
          .then(() => {
            res.json(dbModel);
          })
          .catch((err) => res.status(422).json(err));
      })
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Bazaar.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Bazaar.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};

module.exports = BazaarController;
