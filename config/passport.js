const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../models/user");

// local strategy login only
passport.use(
  new LocalStrategy(
    {
      usernameField: "userName",
      passwordField: "password"

    },
    function(userName, password, done) {
      UserModel.findOne( { userName: userName  }).then(function(dbUser) {
        const checkPass = async function(){
          const rightPass = await dbUser.comparePassword(password);
          return rightPass;
        }
        // If there's no user with the given userName
        if (!dbUser) {
          console.log("no user")
          return done(null, false, {
            message: "Incorrect username."
          });
        }
        // If there is a user with the given userName, but the attempted password is incorrect
        else if (!checkPass) {
          console.log("wrong password")
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
