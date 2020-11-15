const crudControllers = require('../Utils/crud');
const friendGroups = require('../models/friendGroups.model');

const getContains = (model) => async (req, res) => {
  try {
    let results = await model.find({ members: { $in: [req.params.userid] } });

    res.status(200).json(results);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  ...crudControllers(friendGroups),
  getContains: getContains(friendGroups),
};
