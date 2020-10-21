const mongoose = require('mongoose');

const FriendGroupsShema = new mongoose.Schema({
  admin: { type: String, required: true },
  id: { type: String, required: true },
  members: { type: Array, required: true, default: [] },
});

module.exports = mongoose.model('FriendGroups', FriendGroupsShema);
