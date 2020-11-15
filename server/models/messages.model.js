const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
  chatName: { type: String, required: true },
  createdDate: { type: Date, required: true, default: Date.now },
  first_user: {
    type: {
      email: { type: String, required: true },
      image: { type: Number, required: true },
      name: { type: Number, required: true },
      id: { type: Number, required: true },
      username: { type: Number, required: true },
    },
  },
  members: { type: Array, required: true, default: [] },
  path: { type: String, required: true },
});

module.exports = mongoose.model('Messages', MessagesSchema);
