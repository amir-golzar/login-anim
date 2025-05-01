const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const nodemailer = require("nodemailer");

const gt = require("./jwt/GT");

const express = require("express");
const cors = require("cors");
const body = require("body-parser");

const env = require("dotenv");
env.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(body.json());

mongoose.connect(
  `mongodb://${process.env.DB_ADMIN}:${process.env.DB_PWD}@127.0.0.1:28017/admin`
);
const cshema = mongoose.Schema({
  name: { type: "String", required: true },
  email: { type: "String", required: true },
  password: { type: "String", required: true },
});
const forgetShema = mongoose.Schema({
  code: { type: "Number", required: true },
  email: { type: "String", required: true },
  validDate: { type: "Date", required: true },
});

cshema.pre("save", async function () {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

cshema.methods.matchPass = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
};

const User = mongoose.model("sing", cshema);
const Forget = mongoose.model("forget", forgetShema);

function forgetCodeFun(e) {
  return Math.floor(100000 + Math.random() * 900000);
}

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
  const findHuman = await User.findOne({ email,password});
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
    res
      .status(404)
      .json({ message: "No account exists, sign up first.", status: 404 });
  } else {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    const theCode = forgetCodeFun();
    const mailOption = {
      from: `"login form" <${process.env.MAIL_FROM}>`,
      to: email,
      subject: "code forget",
      test: "your forget password code is",
      html: `</b> your forget password code is ${theCode} </b>`,
    };
    transporter.sendMail(mailOption),
      (error, info) => {
        if (error) {
          return console.log("error " + error.message);
        }
        console.log("email sent" + info.respanse);
      };
    /*---------------------------------------------- */

    const vDate = new Date(Date.now() + 30 * 60 * 1000);

    // const cemail = new Forget({ email, validDate: vDate });

    const cemail = new Forget({ email, code: theCode, validDate: vDate });
    cemail.save();
    /*---------------------------------------------- */

    res.status(200).json({
      message: "Enter the recovery code then enter the new password.",
      status: 200,
    });
  }
});
app.put("/updateCode", async (req, res) => {
  const { code, email, password } = req.body;

  const findforgetD = await Forget.findOne({ email });

  const validTime = findforgetD.validDate.getTime();

  const now = new Date().getTime();

  if (now < validTime) {
    const forgetCode = await Forget.findOne({ code: code });
    if (forgetCode) {
      const salt = await bcrypt.genSalt(12);
      const hashpass = await bcrypt.hash(password, salt);
      const updatePASS = await User.updateOne(
        { email },
        { $set: { password: hashpass } }
      );
      const deleteCode = await Forget.deleteOne({ email: email });
      console.log(deleteCode);

      res.status(200).json({ message: "user updated", status:200}, updatePASS);
    }
  } else {
    const deleteCode = await Forget.deleteOne({ email: email });
    console.log(deleteCode);
    res.status(500).json({ message: "yaro pac shod", status: 500 });
  }
});
app.listen(process.env.PORT);
// 1803
