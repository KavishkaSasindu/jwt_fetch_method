const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/UserAuthRoutes");

const app = express();

app.use(express.json());
app.use(
  cors()
);

mongoose
  .connect("mongodb://127.0.0.1:27017/jsonwebtoken")
  .then((result) => {
    console.log("Db is connected");
    app.listen(3000, () => {
      console.log("server is running..");
    });
  })
  .catch((error) => {
    console.log(error);
  });

// routes
app.use(authRouter);
