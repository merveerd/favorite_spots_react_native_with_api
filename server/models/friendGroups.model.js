const mongoose = require('mongoose');
const PlacesSchema = require('./places.model');

const FriendGroupsShema = new mongoose.Schema({
  admin: { type: String, required: true },
  id: { type: String, required: true },
  members: { type: Array, required: true, default: [] },
  places: [PlacesSchema],
});

module.exports = mongoose.model('FriendGroups', FriendGroupsShema);
