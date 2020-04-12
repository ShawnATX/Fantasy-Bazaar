const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const userController = require("../controllers/userController");
const passport = require("../config/passport");

// API Routes
router.use("/api", apiRoutes);

router.post("/login", function(req, res, next) {

})

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;


