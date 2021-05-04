const express = require("express");
const router = express.Router();
const controllers = require("../controllers/messages.controller");

router.route("/").get(controllers.getMany).post(controllers.createOne);

//api/item.:id

router
  .route("/:id")
  .get(controllers.getOne)
  .patch(controllers.updateOne)
  .delete(controllers.removeOne);

module.exports = router;
