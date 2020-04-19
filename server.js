require("dotenv").config();

const passport = require("passport");
const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(
  session({ secret: "dootydootydoo", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/api-routes.js")(app);


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fantasybazaar");

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
