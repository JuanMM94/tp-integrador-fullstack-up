const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_TIMEOUT } = process.env;

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

exports.getToken = (token) => {
  let data;

  jwt.verify(token, JWT_SECRET, (error, decoded) => {
    if (error) data = error;
    else data = decoded;
  });

  return data;
};
