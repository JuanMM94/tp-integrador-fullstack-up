const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { getToken, createToken } = require("./utils/jwt");

exports.signup_post = async (req, res) => {
  try {
    const { email, name, password, r_password, roles } = req.body;

    if (password !== r_password) {
      return res.status(403).json({ error: "Password mismatch" });
    }

    const user = new User({ email, password, name, roles });
    await user.save();

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

exports.login_get = async (req, res) => {
  try {
    const token = req.userId;

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.login_post = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = createToken(user._id);

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
