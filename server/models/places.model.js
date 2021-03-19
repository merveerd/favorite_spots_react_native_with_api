const mongoose = require("mongoose");

const PlacesSchema = new mongoose.Schema({
  ////conditional date? createdDate: { type: Date, required: true, default: Date.now },
  //to track popularity, count can be added
  location: {
    type: {
      type: { type: String, required: false, default: "Point" },
      coordinates: [Number, Number],
    },
    address: { type: String, required: true },
  },
  placeName: { type: String, required: false }, //Original name of the place if it has any

  _id: { type: String, required: true },
});

module.exports = mongoose.model("Places", PlacesSchema);
