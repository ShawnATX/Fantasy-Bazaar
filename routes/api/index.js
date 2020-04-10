const router = require("express").Router();
const itemRoutes = require("./items");
const userRoutes = require("./users");
const bazaarRoutes = require("./bazaars");

// Item API routes
router.use("/item", itemRoutes);
// User API routes
router.use("/user", userRoutes);
// Bazaar API routes
router.use("/bazaar", bazaarRoutes);

module.exports = router;
