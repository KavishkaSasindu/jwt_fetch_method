const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signUp user
const signUpUser = async (request, response) => {
  const { username, email, password } = request.body;

  try {
    // exist the user check
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return response.status(400).json({
        message: "user already exist",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await UserModel.create({
        username,
        email,
        password: hashedPassword,
      });
      if (newUser) {
        const token = await jwt.sign(
          { id: newUser._id, email: newUser.email, username: newUser.username },
          "secret",
          {
            expiresIn: "1h",
          }
        );
        if (token) {
          console.log(token);
          return response.status(201).json({
            message: "user is created",
            user: newUser.email,
            jwt: token,
          });
        }
      } else {
        return response.status(400).json({
          message: "user not created",
        });
      }
    }
  } catch (error) {
    return response.status(404).json({
      message: "User error",
      error: error.message,
    });
  }
};

// signIn user
const signInUser = async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      const authUser = await bcrypt.compare(password, user.password);
      if (authUser) {
        const token = await jwt.sign(
          { id: user._id, email: user.email },
          "secret",
          { expiresIn: "24h" }
        );
        if (!token) {
          return response.status(400).json({
            message: "token not created",
          });
        }
        return response.status(200).json({
          message: "user found and logged in",
          jwt: token,
          user: authUser.email,
        });
      } else {
        return response.status(400).json({
          message: "password incorrect",
        });
      }
    } else {
      return response.status(400).json({
        message: "user not found",
      });
    }
  } catch (error) {
    return response.status(404).json({
      error: error.message,
    });
  }
};

module.exports = { signUpUser, signInUser };
