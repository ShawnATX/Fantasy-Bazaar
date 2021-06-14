const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// local strategy login only
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      console.log(email, password);
      User.findOne({ email: email })
        .then(function (dbUser) {
          const checkPass = async function () {
            const rightPass = await dbUser.comparePassword(password);
            return rightPass;
          };
          // If there's no user with the given email
          if (!dbUser) {
            return done(null, false, {
              message: "Incorrect email.",
            });
          }
          // If there is a user with the given email, but the attempted password is incorrect
          else if (!checkPass) {
            return done(null, false, {
              message: "Incorrect password.",
            });
          }
          // If none of the above, return the user
          else {
            return done(null, dbUser, {
              message: "Log-in Successful.",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    }
  )
);

passport.serializeUser(function (user, done) {
  // console.log(user);
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// Exporting our configured passport
module.exports = passport;
