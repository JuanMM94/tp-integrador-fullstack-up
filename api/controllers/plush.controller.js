const Plush = require("../models/plush.model");

exports.getAllPlushes = async (req, res) => {
  try {
    const plushes = await Plush.find({});

    res.json(plushes);
  } catch (error) {
    console.status(500).json({ message: error.message });
  }
};
