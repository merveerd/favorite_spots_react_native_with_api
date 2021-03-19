const crudControllers = require("../Utils/crud");
const users = require("../models/users.model");

const getBySearchText = (model) => async (req, res) => {
  try {
    const username = req.body.query;
    let doc = await model.find({ username: new RegExp("^" + username, "i") });
    // users.find(
    //   {
    //     $text: {
    //       $search: searchInput,
    //     },
    //   },

    //   {
    //     _id: 1,
    //     textScore: {
    //       $meta: "textScore",
    //     },
    //   },
    //   {
    //     sort: {
    //       textScore: {
    //         $meta: "textScore",
    //       },
    //     },
    //   }
    // );

    res.status(201).json(doc);
  } catch (err) {
    console.log("error", err);
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  ...crudControllers(users),
  getBySearchText: getBySearchText(users),
};
