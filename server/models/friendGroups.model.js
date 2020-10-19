const mongoose = require("mongoose");

const FriendGroupsShema = mongoose.Schema({
  admin: {type: String, required: true},
  id: {type: String, required: true},
  members: {type: Array, required: true},
});

module.exports = mongoose.model("FriendGroups", FriendGroupsShema);
