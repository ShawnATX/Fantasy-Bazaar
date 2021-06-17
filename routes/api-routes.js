const db = require("../models");
const passport = require("../config/passport");
const userController = require("../controllers/userController");
const bazaarController = require("../controllers/bazaarController");
const itemController = require("../controllers/itemController");
const characterController = require("../controllers/characterController");
const isAuth = require("../config/middleware/isAuthenticated").isAuth;

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the player page.
  // Otherwise the user will be sent an error
  app.post(
    "/api/users/login",
    passport.authenticate("local"),
    function (req, res) {
      res.json({
        email: req.user.email,
        characters: req.user.characters,
        bazaars: req.user.bazaars,
        id: req.user._id,
      });
    }
  );

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.status(200).clearCookie("connect.sid", { path: "/" });
    req.session.destroy(function (err) {
      res.redirect("/");
    });
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
  //Route to get individual user public data
  app.get("/api/user", function (req, res) {
    if (!req.user) {
      // The user has no session key
      res.status(401).json("no session found");
    } else {
      res.json({
        email: req.user.email,
        characters: req.user.characters,
        bazaars: req.user.bazaars,
        id: req.user._id,
      });
    }
  });
  //Check uniqueness of an email address before attempting to save a new user
  app.post("/api/users/email/", userController.findByEmail);

  //BAZAAR ROUTES
  //check on bazzar from code, returns bazaar _id, name, system
  app.get(
    "/api/bazaars/code/:joinCode",
    isAuth,
    bazaarController.findByJoinCode
  );

  //get bazzar with given ID
  app.get("/api/bazaars/:id", isAuth, bazaarController.findById);

  //get a list of bazaars
  app.post("/api/bazaars/many", isAuth, bazaarController.findManyById);

  //create a new bazaar
  app.post("/api/bazaars", isAuth, bazaarController.create);

  //ITEM ROUTES
  //get multiple items from an array of _ids
  app.post("/api/items/many", isAuth, itemController.findManyById);

  //Route to get all inventory items of a particular system, passing {system: string}
  app.get("/api/items/:system", isAuth, itemController.findAllBySystem);

  //CHARACTER ROUTES
  app.post("/api/characters", isAuth, characterController.create);

  app.get("/api/characters/:id", isAuth, characterController.findById);

  app.post("/api/characters/many", isAuth, characterController.findManyById);

  app.put("/api/characters/:id", isAuth, characterController.update);

  app.put("/api/characters/items", isAuth, characterController.addItems);

  //Update character (item &  wallet)
  app.post("/api/characters/purchase", isAuth, characterController.purchase);

  //Update character (item list &  wallet)
  app.post("/api/characters/sell", isAuth, characterController.sell);
};
