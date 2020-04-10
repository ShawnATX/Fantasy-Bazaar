const router = require("express").Router();
const itemRoutes = require("./items");
const userRoutes = require("./users");
const bazaarRoutes = require("./bazaars");

// User API routes
router.use("/users", userRoutes);
// Item API routes
router.use("/items", itemRoutes);
// Bazaar API routes
router.use("/bazaars", bazaarRoutes);

router.route("/")
  .get(() => console.log("API get"));

module.exports = router;
