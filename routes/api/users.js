const router = require("express").Router();
const userController = require("../../controllers/userController");
const passport = require("../../config/passport");

// Matches with "/api/users"
router.route("/")
  .get(userController.findAll)
  .post(userController.create);

// Matches with "/api/users/login"
router.route("/login")
.post((req, res) => {
  console.log(req.body);
  passport.authenticate('local', { 
    successRedirect: '/playerhome', 
    failureRedirect: '/login' });
  });

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

  

module.exports = router;
