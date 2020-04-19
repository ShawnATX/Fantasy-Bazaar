const db = require("../models");

//Controller methods for Users
const UserController =  {
  findAll: function(req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User
      .create({...req.body, wallet: parseInt(req.body.wallet)})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    //console.log(req);
    db.User
      .findOneAndUpdate( req.params , req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //route specifically for adding item to user item list and decrementing gold. This returns the newly modified user doc (not the default unmodified doc)
  purchase: function(req, res) {
    console.log(req.user);
    console.log("Purchase route", req.body);
    db.User
      .findOneAndUpdate( { _id: req.user._id}, { 
        $push: { items: req.body.items[0]}, 
        $set: { wallet: req.body.wallet} 
      }, {new: true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //route specifically for updating user item array with a new array and incrementing gold. This returns the newly modified user doc (not the default unmodified doc)
  sell: function(req, res) {
    console.log(req.user);
    console.log("Sell route", req.body);
    db.User
      .findOneAndUpdate( { _id: req.user._id}, { 
        $set: { items: req.body.items, wallet: req.body.wallet } 
      }, {new: true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};


module.exports = UserController;