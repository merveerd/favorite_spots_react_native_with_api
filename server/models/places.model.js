const mongoose = require("mongoose");

const PlacesSchema = mongoose.Schema({
  createdDate: {type: Date, required: true, default: Date.now},
  desc: {type: String, required: true},
  image: {type: String, required: false},
  friendGroups: {type: String, required: false},
  location: {
    type: {
      address: {type: String, required: true},
      latitude: {type: Number, required: true},
      longitude: {type: Number, required: true},
    },
  },
  placeName: {type: String, required: false},
  user: {type: String, required: false},
});

module.exports = mongoose.model("Places", PlacesSchema);
