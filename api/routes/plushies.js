const express = require("express");
const router = express.Router();
const plushieController = require("../controllers/plushie.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/plushies", plushieController.plushies_get);
router.post(
  "/plushies",
  authMiddleware.requireAuth,
  plushieController.plushies_post
);

module.exports = router;
