const express = require("express");
const authController = require("../controller/UserController");

const router = express.Router();

router.post("/signUp", authController.signUpUser);
router.post("/signIn", authController.signInUser);

module.exports = router;
