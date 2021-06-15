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
  session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/api-routes.js")(app);

if (process.env.MONGODB_URI) {
  console.log(process.env.MONGODB_URI);
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
db.once("open", function () {
  // we're connected!
});

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
