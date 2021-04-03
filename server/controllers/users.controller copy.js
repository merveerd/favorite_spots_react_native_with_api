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
    console.log("getUserData");
    let doc = await model.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(`${req.params.id}`) } },

      {
        $lookup: {
          from: "places",
          localField: "places._id",
          foreignField: "_id",
          as: "places",
        },
      },
      {
        $lookup: {
          from: "places",
          let: {
            places: "$places", // keep a reference to the "places" field of the current document and make it accessible via "$$places"
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$places._id"], // this just does the "joining"
                },
              },
            },

            {
              $addFields: {
                location: {
                  $arrayElemAt: [
                    "$$places.location",
                    { $indexOfArray: ["$$places._id", "$_id"] },
                  ],
                },
                placeName: {
                  $arrayElemAt: [
                    "$$places.placeName",
                    { $indexOfArray: ["$$places._id", "$_id"] },
                  ],
                },
              },
            },
          ],
          as: "places",
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
