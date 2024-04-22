require("dotenv").config();

const jwt = require("jsonwebtoken");

const { JWT_TIMEOUT } = require("./constants");
const { JWT_SECRET } = process.env;

exports.createToken = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_TIMEOUT,
    }
  );
};

exports.verifyToken = (token, cb) => {
  if (!token) return null;

  return jwt.verify(token, JWT_SECRET, cb)
};
