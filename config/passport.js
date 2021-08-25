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
      console.log("In passport local strategy")
      User.findOne({ email: email })
      .then((dbUser) => {
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email",
          });
        }
        async function checkPassword() {
          let validPassword = await dbUser.comparePassword(password); 
          return await validPassword;
        }
        checkPassword().then((isValid) => {
          if (!isValid) {
            console.log("no checks out!");
            return done(null, false, {
            message: "Incorrect password.",
            });
          }
         else {
           return done(null, dbUser, {
             message: "Log-in Successful.",
           });
         }
        })
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
