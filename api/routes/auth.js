const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/auth/signup", authController.signup_post);
router.get("/auth/login", authMiddleware.verifyToken, authController.login_get);
router.post("/auth/login", authController.login_post);

module.exports = router;
