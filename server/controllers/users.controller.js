const mongoose = require("mongoose");
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

const getUserData = (model) => async (req, res) => {
  try {
    let doc = await model.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(`${req.params.id}`) } },

      {
        $lookup: {
          from: "places",
          let: {
            places: "$places",
          },
          pipeline: [
            { $match: { $expr: { $in: ["$_id", "$$places._id"] } } },
            {
              $addFields: {
                description: {
                  $arrayElemAt: [
                    "$$places.description",
                    { $indexOfArray: ["$$places._id", "$_id"] },
                  ],
                },
                photos: {
                  $arrayElemAt: [
                    "$$places.photos",
                    { $indexOfArray: ["$$places._id", "$_id"] },
                  ],
                },
                createdDate: {
                  $arrayElemAt: [
                    "$$places.createdDate",
                    { $indexOfArray: ["$$places._id", "$_id"] },
                  ],
                },
              },
            },
          ],
          as: "places",
        },
      },
      { $unwind: "$places" },
      {
        $group: {
          _id: "$_id",
          email: { $first: "$email" },
          username: { $first: "$username" },
          name: { $first: "$name" },
          image: { $first: "$image" },
          places: { $push: "$places" },
        },
      },
    ]);
    res.status(201).json(doc);
  } catch (err) {
    console.log("error", err);
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  ...crudControllers(users),
  getBySearchText: getBySearchText(users),
  getUserData: getUserData(users),
};
