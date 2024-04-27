const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/auth/signup", authController.signup_post);
router.post("/auth/login", authController.login_post);
router.get("/auth/logout", authController.logout_get);
router.get("/auth/confirmation", authController.confirmation_get);

module.exports = router;
