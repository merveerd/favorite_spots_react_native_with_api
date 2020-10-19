const express = require('express');
const router = express.Router();
const controllers = require('../controllers/users.controller');

//
router.route('/').get(controllers.getMany);

//item.:id
router
  .route('/:id')
  .get(controllers.getOne)
  .patch(controllers.updateOne)
  .delete(controllers.removeOne); //token should be removed on client side
module.exports = router;
