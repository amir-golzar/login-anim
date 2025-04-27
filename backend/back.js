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

mongoose.connect(`mongodb://${process.env.DB_ADMIN}:${process.env.DB_PWD}1234@127.0.0.1:27017/admin`);

const cshema = mongoose.Schema({
  name: "String",
  email: "String",
  password: "String",
});

cshema.pre("save", async function () {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

cshema.methods.matchPass = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
};

const User = mongoose.model("sing", cshema);

app.post("/sing", (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({ name, email, password });
  console.log(newUser);
  console.log(newUser._id);

  newUser
    .save()
    .then(() => {
      const jwt = gt(newUser._id);
      res.json({ message: "are", token: jwt });
    })
    .catch((e) => {
      res.send(501).json({ message: "na" });
    });
});
app.head("/tocen", async (req, res) => {
  const { email } = req.body;

  const faid = await User.findOne({ email: email });
  if (faid) {
    const tocen = gt(faid._id);
    res.json(tocen);
    console.log(tocen);
  }
});
app.get("/profile", async (req, res) => {
  const token = req.headers.authorization;

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decode);

  const find = await User.findById(decode.id, {
    name: true,
    email: true,
    _id: false,
  });

  console.log(find);
  res.json(find);
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const findHuman = await User.findOne({ email });
  if (!findHuman) {
    res.status(404).json({ message: "kir shodi", status: 404 });
    return;
  }
  const decode = await findHuman.matchPass(password);

  if (decode) {
    console.log(decode);
    const jwt = gt(findHuman._id);
    res.json({ message: "are", token: jwt });
  }
  console.log(findHuman);
});

app.post("/EEGP", async (req, res) => {
  const { email } = req.body;

  const getEmail = await User.findOne({ email });

  if (!getEmail) {
    res.status(404).json({message:'No account exists, sign up first.',status:404})
  }else{
    res.status(200).json({message:"Enter the recovery code then enter the new password.",status:200})
  }
});

app.listen(process.env.PORT);
