var db = require("../models");
var passport = require("../config/passport");
const userController = require("../controllers/userController");
const bazaarController = require("../controllers/bazaarController");
const itemController = require("../controllers/itemController");

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

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/users", userController.create);
  // .then(function () {
  //     res.redirect(307, "/api/login");
  // })
  //     .catch(function (err) {
  //         res.status(401).json(err);
  //     })

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.json({});
  });

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

  //Update user (item &  wallet)
  app.put("/api/users/purchase", userController.purchase);

  //Update user (item list &  wallet)
  app.put("/api/users/sell", userController.sell);

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
};
