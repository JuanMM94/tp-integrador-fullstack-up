require("dotenv").config();
const { verifyToken } = require("../controllers/utils/jwt");

exports.requireAuth = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) return res.status(403).json({ error: "No token provided" });

    verifyToken(token, (error, decoded) => {
      if (error) {
        return res.status(403).json({ error: error.message });
      }

      req.userId = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};