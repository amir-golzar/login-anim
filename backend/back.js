const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// const gt = require("./jwt/gt");

const express = require("express");
const cors = require("cors");
const body = require("body-parser");

const env = require("dotenv");
env.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(body.json());

mongoose.connect("mongodb://127.0.0.1:27017/admin");

const cshema = mongoose.Schema({
  userName: "String",
  email: "String",
  password: "String",
});



const User = mongoose.model("sing", cshema);

app.post("/sing", (req, res) => {
  const { userName, email, password } = req.body;

  const newUser = new User({ userName, email, password });

  newUser
    .save()
    .then(() => {
      res.json({ message: "are" });
    })
    .catch((e) => {
      res.send(501).json({ message: "na" });
    });
});

app.listen(process.env.PORT);
