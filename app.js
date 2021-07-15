// start: nodemon app.js

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const { Router } = require("express");
const port = process.env.PORT || 8000;


const userRouter = require("./routers/user");

const mentorRouter = require("./routers/mentor");

const test_mentor = require("./routers/test_mentor");

require("./db/conn");

const app = express();
app.use('/', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());


app.use(userRouter);
app.use(mentorRouter);
app.use(test_mentor);


// console.log(process.env.JWT_KEY)

app.listen(port, () => {
    console.log(`Server up at ${port}`)
})