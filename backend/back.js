const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const gt = require('./jwt/GT');
const express = require('express');
const cors = require('cors');
const body = require('body-parser');

const env = require('dotenv');
env.config()

const app=express()

app.use(cors({origin:"*"}))
app.use(body.json())



app.post("/soinin",(req,res) => {
    res.json("kir")
})

app.listen(process.env.PORT)