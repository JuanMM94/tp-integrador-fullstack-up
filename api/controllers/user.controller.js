const User = require("../models/user.model");

exports.me_get = async (req, res) => {
  try {
    const id = req.userId.data;

    const user = await User.findById(id)
      .select("-password")
      .populate("plushies")
      .exec();

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.me_patch = async (req, res) => {
  const id = req.userId.data;
  const { name, password, r_password } = req.body;

  try {
    const user = await User.findById(id);

    if (password !== r_password) {
      return res.status(304).json({ error: "Password mismatch" });
    }

    if (name) {
      user.name = name;
    }

    if (password) {
      user.password = password;
    }

    await user.save();

    return res.sendStatus(204);
  } catch (error) {
    return res.status(400).json(error);
  }
};
