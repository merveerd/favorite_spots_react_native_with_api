const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/users.model');
require('dotenv').config();

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  else if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // unique email error
  else if (err.code === 11000) {
    console.log('error code is 11000');
    errors.email = 'That email is already registered';
    return errors;
  }

  // validation errors
  else if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  } else {
    errors = { message: err.message };
  }

  return errors;
};

const verifyToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload.id);
    });
  });
};

// create json web token

const createToken = (id) => {
  console.log('numbered token life ', Number(process.env.REFRESH_TOKEN_LIFE));
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: Number(process.env.REFRESH_TOKEN_LIFE),
  });
};

const signup = async (req, res) => {
  const { email, password, username, name } = req.body;

  try {
    if (!email || !password || !username || !name) {
      return res
        .status(400)
        .json({ message: 'Please fill the all information' });
    }
    let user = await User.find({ email });
    if (user.length > 0) {
      return res
        .status(400)
        .json({ message: 'A user with that email already exists.' });
    }

    user = await User.create({ email, password, username, name }); //.create is async function
    const token = createToken(user._id);

    return res.status(201).json({ token, user });
  } catch (err) {
    const errors = handleErrors(err);

    res.status(400).json({ errors });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill the all information' });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      try {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
          const token = createToken(user._id);
          return res.status(201).json({ token, user }); //give the user back too
        } else {
          return res.status(400).json({ message: 'incorrect password' });
        }
      } catch (err) {
        //console.log('signIn err', err);
        return res.status(400).json({ message: 'incorrect email' });
      }
    }
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

const protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'not authorized' });
  }

  let token = req.headers.authorization.split('Bearer ')[1];

  if (!token || token === 'null') {
    return res.status(401).json({ message: 'not authorized' });
  }
  try {
    const payload = await verifyToken(token);
    const user = await User.findById(payload);
    //   .select('-password') //removing password
    //   .lean() //converting into json data from mongoose
    //   .exec(); // Will execute returning a promise
    // req.user = user; //we removed the password and execution will be continued for routes actions
    res.status(200).json({ user });

    //  next();
  } catch (e) {
    return res.status(401).json({ message: 'not authorized' });
  }
};

module.exports = { signin, signup, protect };
