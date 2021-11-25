const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/employeesDB");

const recordSchema = new mongoose.Schema({
  user: "string",
  pin: "Number",
  timeIn: "string",
  timeOut: "string",
});

const Record = mongoose.model("Record", recordSchema);

const today = new Date();
const time = {
  hour: "2-digit",
  minute: "2-digit",
};
const day = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  weekday: "short",
};

const currentDay = today.toLocaleString("en-US", day);
const currentTime = today.toLocaleString("en-US", time);

app.get("/", function (req, res) {
  res.render("home");
});

app.post("/", function (req, res) {
  const pin = req.body.pin;
  Record.findOne({ pin: pin }, function (err, found) {
    if (found) {
      res.redirect("/dtr");
    } else {
      console.log(err);
    }
  });
});

app.post("/dtr", function (req, res) {
  console.log(currentTime);
  res.render("timeInOut");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  const user = req.body.employeeName;
  const pin = req.body.pin;

  const newUser = new Record({ user: user, pin: pin });

  newUser.save(function (err) {
    if (!err) {
      console.log("Employee added succesfully.");
      res.redirect("/");
    } else {
      console.log(err);
    }
  });
});

app.listen(3000, function () {
  console.log("Server started at port 3000.");
});
