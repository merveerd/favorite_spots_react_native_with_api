const mongoose = require("mongoose");
//mongoose.set('useCreateIndex', true);
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true, //we cant give error message
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  name: { type: String, required: true },
  username: {
    type: String,
    required: true,
    text: true,
    index: true,
  },
  image: { type: String, required: false },
  places: [
    {
      _id: { type: String },
      description: { type: String },
      photos: [String],
      createdDate: { type: Date, default: Date.now },
    },
  ],
  createdDate: { type: Date, default: Date.now },
});
userSchema.index({ username: "text" });
// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt); //'this' here refers user instance as we didnt use arrow function
  next();
});

// // static method to login user
// userSchema.statics.login = async function (email, password) {

//   const user = await this.findOne({ email });
//   if (user) {
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth) {
//       return user;
//     }
//     throw Error('incorrect password');
//   }
//   throw Error('incorrect email');
// };

const User = mongoose.model("user", userSchema);

module.exports = User;
