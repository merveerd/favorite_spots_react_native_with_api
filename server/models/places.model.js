const mongoose = require('mongoose');

const PlacesSchema = new mongoose.Schema({
  createdDate: { type: Date, required: true, default: Date.now },
  desc: { type: String, required: false },
  image: { type: String, required: false }, //can be array for later
  location: {
    type: {
      address: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
  },
  placeName: { type: String, required: false },
  //originId
});

module.exports = PlacesSchema;
// module.exports = mongoose.model('Places', PlacesSchema);
