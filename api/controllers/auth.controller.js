require("dotenv").config();

const Token = require("../models/token.model");
const User = require("../models/user.model");
const { JWT_TIMEOUT } = require("../utils/constants");
const { sendEmail } = require("./utils/emailSender");
const { createToken } = require("./utils/jwt");

exports.signup_post = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const user = await User.signup(email, name, password);

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    if (!user.isVerified) {
      return res.status(401).json({ error: "Account is not verified" });
    }

    const token = createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: JWT_TIMEOUT * 1000,
      secure: false,
      path: "/",
    });
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: error.message });
  }
};

exports.logout_get = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: false,
      domain: "localhost",
      path: "/",
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(403);
  }
};

exports.confirmation_get = async (req, res) => {
  const { token } = req.params;

  try {
    const foundToken = await Token.findOne({ token });
    if (!foundToken) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const user = await User.findOne({ _id: foundToken._userId });
    if (!user) {
      return res.status(400).json({ error: "User was not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ error: "User is already verified" });
    }

    user.isVerified = true;
    await user.save();

    return res.status(200).json({ message: "User has been verified" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.resend_post = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "User was not found" });
    if (user.isVerified)
      return res.status(400).json({ error: "User is already verified" });

    const token = new Token({
      _userId: user._id,
      token: createToken(user._id),
    });
    await token.save();

    await sendEmail(email, token);

    return res
      .status(200)
      .json({ message: "Verification token has been sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
