require("dotenv").config();

const User = require("../models/user.model");
const { JWT_TIMEOUT } = require("../utils/constants");
const { sendEmail } = require("./utils/emailSender");
const { createToken, verifyToken } = require("./utils/jwt");

exports.signup_post = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const user = new User({ email, password, name });
    await user.save();

    const confirmToken = createToken(user.email);
    const loginToken = createToken(user._id);

    user.token = confirmToken;
    await user.save();

    await sendEmail(email, confirmToken);

    res.cookie("jwt", loginToken, {
      httpOnly: true,
      maxAge: JWT_TIMEOUT * 1000,
    });
    return res.status(201).json({ user: user._id });
  } catch (error) {
    console.error(error);
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
  try {
    res.clearCookie("jwt");
    return res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(403);
  }
};

exports.confirmation_get = async (req, res) => {
  const { token } = req.params;
  req.assert

  try {
    const user = await User.findOne({ token });

    if (!user) return res.status(404).send({ error: "Not found" });

    verifyToken(token, async (error, decoded) => {
      if (error) {
        return res.status(403).json({ error: error.message });
      }

      user.isConfirmed = true;
      await user.save();
    });

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
