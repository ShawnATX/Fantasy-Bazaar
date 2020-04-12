var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

// local strategy login only
passport.use(
  new LocalStrategy(
    {
      usernameField: "userName",
      passwordField: "password"

    },
    function(username, password, done) {
      var dbUser = db.User;
      console.log(db.User, "From Passport");
      dbUser.find( { userName: username  }).then(function(dbUser) {
        // If there's no user with the given userName
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect username."
          });
        }
        // If there is a user with the given userName, but the attempted password is incorrect
        else if (!dbUser.comparePassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // If none of the above, return the user
        else {

          return done(null, dbUser, {
            message: "Log-in Successful."
          });
        }
      });
    }
  )
);

passport.serializeUser(function(user, cb) {
  console.log(user);
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
