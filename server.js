require("dotenv").config();
const passport = require("passport");
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  databaseName: "fantasybazaar",
  collection: "sessions",
});

app.use(express.json({ limit: "20mb" }));
app.use(
  express.urlencoded({ limit: "20mb", extended: true, parameterLimit: 50000 })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(
  session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: store,
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
    autoIndex: false,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {});

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
