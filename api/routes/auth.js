const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/auth/signup", authController.signup_post);
router.post("/auth/login", authController.login_post);
router.get("/auth/logout", authController.logout_get);
router.get("/auth/confirmation/:token", authController.confirmation_get);
router.post("/auth/resend", authController.resend_post);

module.exports = router;
