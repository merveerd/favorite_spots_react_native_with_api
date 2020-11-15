const express = require('express');
const router = express.Router();
const controllers = require('../controllers/friendGroups.controller'); //check if the naming is working

//friendgroups
router.route('/').get(controllers.getMany).post(controllers.createOne);

//friendgroups:id
router
  .route('/:id')
  .get(controllers.getOne)
  .patch(controllers.updateOne)
  .delete(controllers.removeOne);

router.route('/manyById').get(controllers.getManyById);
router.route('/byUserId/:userid').get(controllers.getContains);

module.exports = router;
