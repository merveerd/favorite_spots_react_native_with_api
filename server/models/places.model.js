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
});

// //As favouriteFoods is a simple array of strings, you can just query that field directly:

// PersonModel.find({ favouriteFoods: "sushi" }, ...);

// model:
// person = {
//     name : String,
//     favoriteFoods : Array
// }
module.exports = PlacesSchema;
// module.exports = mongoose.model('Places', PlacesSchema);
