const router = require("express").Router();
const itemRoutes = require("./items");
const userRoutes = require("./users");
const bazaarRoutes = require("./bazaars");

// Item API routes
router.use("/items", itemRoutes);
// User API routes
router.use("/users", userRoutes);
// Bazaar API routes
router.use("/bazaars", bazaarRoutes);

module.exports = router;
