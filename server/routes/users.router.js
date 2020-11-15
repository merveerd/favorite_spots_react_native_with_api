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
  .post(controllers.updateSubDoc)
  .delete(controllers.removeOne);

router.route('/').post(controllers.getBySearchText);
module.exports = router;
