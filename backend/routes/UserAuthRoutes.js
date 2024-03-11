const express = require("express");
const authController = require("../controller/UserController");

const router = express.Router();

router.post("/user/signUp", authController.signUpUser);
router.post("/user/signIn");

module.exports = router;
