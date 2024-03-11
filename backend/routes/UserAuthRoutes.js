const express = require("express");
const authController = require("../controller/UserController");

const router = express.Router();

router.post("/api/signUp", authController.signUpUser);
router.post("/api/signIn", authController.signInUser);

module.exports = router;
