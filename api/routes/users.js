const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/users/me", authMiddleware.requireAuth, userController.me_get);
router.patch("/users/me", authMiddleware.requireAuth, userController.me_patch);

module.exports = router;
