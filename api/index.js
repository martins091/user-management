const express = require("express");
const cors = require("cors");
const User = require("./models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fs = require("fs");

const salt = bcrypt.genSaltSync(10);
const secret = "asjdddfk89ene8enh39j3nkaskjfhiw83h92h9wjn3";

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(
  "mongodb+srv://mernblog:mernblog1@cluster0.4ubhlvj.mongodb.net/?retryWrites=true&w=majority"
);
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      // res.send(`Welcome ${username}. You are now logged in.`);
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/delete", async (req, res) => {
  const { id } = req.body;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json("User not found");
    }

    res.json({ message: "User deleted successfully", deletedUser });
  } catch (e) {
    console.error("Error deleting user:", e);
    res.status(500).json("Internal Server Error");
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("Logged out!");
});

app.listen(4000);
