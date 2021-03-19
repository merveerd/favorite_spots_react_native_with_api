const crudControllers = require("../Utils/crud");
const places = require("../models/places.model");

const createPlace = (model) => async (req, res) => {
  console.log("create place", req.body);
  try {
    let keys = Object.keys(req.body), //check this if it right
      updateObject = {};
    keys.forEach((item) => {
      updateObject[item] = req.body[item];
    });

    const doc = await model.updateOne(
      {
        _id: req.body._id,
      },
      { $setOnInsert: updateObject },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(doc);
  } catch (err) {
    console.log("place create", err);
    res.status(404).json({ message: err });
  }
};

module.exports = {
  ...crudControllers(places),
  createPlace: createPlace(places),
};
