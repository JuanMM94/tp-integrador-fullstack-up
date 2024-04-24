require("dotenv").config();

const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;
const { JWT_TIMEOUT } = require("../../utils/constants");

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
