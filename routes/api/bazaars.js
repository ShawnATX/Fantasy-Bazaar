const router = require("express").Router();
const bazaarController = require("../../controllers/bazaarController");

// Matches with "/api/bazaars"
router.route("/")
  .get(bazaarController.findAll)
  .post(bazaarController.create);

// Matches with "/api/bazaars/:id"
router
  .route("/:id")
  .get(bazaarController.findById)
  .put(bazaarController.update)
  .delete(bazaarController.remove);

module.exports = router;
