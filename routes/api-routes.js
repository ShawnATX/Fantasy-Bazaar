var db = require("../models");
var passport = require("../config/passport");
const userController = require("../controllers/userController");
const bazaarController = require("../controllers/bazaarController");
const itemController = require("../controllers/itemController");
const characterController = require("../controllers/characterController");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the player page.
  // Otherwise the user will be sent an error
  app.post(
    "/api/users/login",
    passport.authenticate("local"),
    function (req, res) {
      res.json({
        email: req.email,
      });
    }
  );

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.json({});
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our User Model.
  app.post("/api/users", userController.create);

  //Route to get individual user public data
  app.get("/api/users/:id", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      res.json({
        email: req.user.email,
      });
    }
  });

  //Check uniqueness of an email address before attempting to save a new user
  app.post("/api/users/email/", userController.findByEmail);

  //BAZAAR ROUTES
  //check on bazzar from code, returns bazaar _id
  app.get("/api/bazaars/code/:joinCode", bazaarController.findByJoinCode);

  //get bazzar with given ID
  app.get("/api/bazaars/:id", bazaarController.findById);

  //create a new bazaar
  app.post("/api/bazaars", bazaarController.create);

  //ITEM ROUTES
  //get multiple items from an array of _ids
  app.post("/api/items/many", itemController.findManyById);

  //Route to get all inventory items of a particular system, passing {system: string}
  app.get("/api/items/:system", itemController.findAllBySystem);

  //CHARACTER ROUTES
  app.post("/api/characters", characterController.create);

  app.get("/api/characters/:id", characterController.findById);

  app.post("/api/characters/many", characterController.findManyById);

  app.put("/api/characters/:id", characterController.update);

  app.put("/api/characters/items", characterController.addItems);

  //Update character (item &  wallet)
  app.put("/api/characters/purchase", characterController.purchase);

  //Update character (item list &  wallet)
  app.put("/api/characters/sell", characterController.sell);
};
