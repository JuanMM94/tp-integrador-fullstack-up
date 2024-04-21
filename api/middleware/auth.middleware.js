const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(403).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token);
    req.userId = decoded.userId;
  } catch (error) {
    return res.status(401).json({ token: null });
  }
};
