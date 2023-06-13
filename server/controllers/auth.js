import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// todo: Use Passportjs for authentication and
// login

// Register user

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, location, occupation } =
      req.body;

    let picturePath = '';
    if (req.file) picturePath = req.file.filename;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    // for storing the hash password
    // console.log('here');
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
      // todo: viewedProfile for now is getting random generated, which
      // we need to change to actual logic of it.
      // same to do for impressions
    });
    const savedUser = await newUser.save();
    // console.log(savedUser);
    res.status(201).json(savedUser);
    // sending the new user in json with status code 201.
  } catch (err) {
    res.status(500).json({ error: err.message });
    // otherwise sending error json with status code 500.
  }
};

// logging in

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ msg: 'User does not exist.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
