const mongoose = require('mongoose');
const PlacesSchema = require('./places.model');

const FriendGroupsShema = new mongoose.Schema({
  name: { type: String, required: true },
  admin: { type: String, required: true },
  members: { type: Array, required: true, default: [] },
  places: [PlacesSchema],
});

module.exports = mongoose.model('FriendGroups', FriendGroupsShema);
