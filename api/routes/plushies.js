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
router.delete(
  "/plushies/:id",
  authMiddleware.requireAuth,
  plushieController.plushies_delete
);
router.get(
  "/users/me/plushies",
  authMiddleware.requireAuth,
  plushieController.me_plushies_get
);
router.get("/plushies/ranking", plushieController.plushies_ranking_get);

module.exports = router;
