const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const gt = require("./jwt/GT");

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

cshema.pre("save", async function () {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("sing", cshema);

app.post("/sing", (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({ userName:name, email, password });

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
