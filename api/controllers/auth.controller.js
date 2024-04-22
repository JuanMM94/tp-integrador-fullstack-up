require("dotenv").config();

const User = require("../models/user.model");
const { JWT_TIMEOUT } = require("./utils/constants");
const { getToken, createToken } = require("./utils/jwt");

exports.signup_post = async (req, res) => {
  try {
    const { email, name, password, r_password, roles } = req.body;

    if (password !== r_password) {
      return res.status(403).json({ error: "Password mismatch" });
    }

    const user = new User({ email, password, name, roles });
    await user.save();

    const token = createToken(user._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: JWT_TIMEOUT * 1000 });
    return res.status(201).json({ user: user._id });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

exports.login_get = async (req, res) => {
  try {
    const userId = req.userId;

    return res.status(200).json({ userId });
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: JWT_TIMEOUT * 1000 });
    return res.status(200).json({ user: user._id });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

exports.logout_get = (req, res) => {
  res.clearCookie("jwt");
  return res.sendStatus(204);
};
