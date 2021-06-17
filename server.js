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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(
  session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: new (require("express-sessions"))({
      storage: "mongodb",
      instance: mongoose, // optional
      // host: 'localhost', // optional
      // port: 27017, // optional
      db: "fantasybazaar", // optional
      collection: "sessions", // optional
      // expire: 86400, // optional
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/api-routes.js")(app);

if (process.env.MONGODB_URI) {
  console.log("connected to mongoDB");
}
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/fantasybazaar",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {});

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
