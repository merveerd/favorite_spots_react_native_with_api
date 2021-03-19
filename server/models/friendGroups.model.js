const mongoose = require("mongoose");
const PlacesSchema = require("./places.model");

const FriendGroupsShema = new mongoose.Schema({
  name: { type: String, required: true },

  admin: { type: String, required: true },
  members: { type: Array, required: true, default: [] },
  places: [
    {
      _id: { type: String, required: true },
      description: { type: String },
      photos: [String],
      createdDate: { type: Date, default: Date.now },
    },
  ],
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FriendGroups", FriendGroupsShema);
