const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserByID);
router.post("/users", userController.addNewUser);
router.put("/users/:id", userController.updateUserByID);
router.patch("/users/:id", userController.patchUserByID);

module.exports = router;
