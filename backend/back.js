const mongoose = require("mongoose");
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

const mongooseURL = mongoose.connect("mongodb://127.0.0.1:27017/local");

const mSchema = mongoose.Schema({
  userName: { type: "String", required: true },
  email: { type: "String", required: true },
  password: { type: "String", required: true },
});

mSchema.pre("save", async (e) => {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

mSchema.methods.matchPass = async function (enterpass) {
  return await bcrypt.compare(enterpass, this.password);
};

const User = mongoose.model("soinin", mSchema);

app.post("/soinin", (req, res) => {
    const { userName, email, password } = req.body;

    const newUser = new User({ userName, email, password });
    newUser
      .save()
      .then((data) => {
        res.json({ message: "user is saved", status: "ok" });
      })
      .catch((err) => {
        res.json({ message: "user is not save", status: "oky" });
      });
});

app.listen(process.env.PORT);
