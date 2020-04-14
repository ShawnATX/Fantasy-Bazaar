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
  //route specifically for adding item to user item list and decrementing gold
  purchase: function(req, res) {
    console.log(req.user);
    console.log("Purchase route", req.body);
    db.User
      .findOneAndUpdate( { _id: req.user._id}, { 
        $push: { items: req.body.items[0]}, 
        $set: { wallet: req.body.wallet} 
      })
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