const Plushie = require("../models/plushie.model");
const User = require("../models/user.model");

exports.plushies_get = async (req, res) => {
  try {
    const plushies = await Plushie.find({});

    return res.status(200).json(plushies);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.plushies_post = async (req, res) => {
  const { type, color, props } = req.body;
  const id = req.userId.data;

  try {
    const plushie = new Plushie({ _creator: id, type, color, props });

    await plushie.save();

    const user = await User.findOne({ _id: id }).populate("plushies").exec();

    user.plushies.push(plushie);

    await user.save();

    return res.status(201).json(plushie);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
