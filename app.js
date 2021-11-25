const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const ejs = require("ejs");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/employeesDB");

const recordSchema = new mongoose.Schema({
  user: String,
  pin: Number,
});

const Record = mongoose.model("Record", recordSchema);

//////////////////////////// Current Date ///////////////////////
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

/////////////////////////////////////////////////////////////////
app.get("/", function (req, res) {
  res.render("home");
});

app.post("/", function (req, res) {
  const pin = req.body.pin;
  Record.findOne({ pin: pin }, function (err, found) {
    if (found) {
      const user = _.lowerCase(found.user);
      res.redirect("/" + user);
    } else {
      console.log(err);
    }
  });
});

// app.get("/:user", function (req, res) {
//   const user = req.params.user;
//   Record.findOne({ user: user }, function (err, record) {
//     console.log(record);
//     // res.render("dtr", {
//     //   date: ,
//     //   user: user,
//     // });
//   });
// });

app.post("/:user", function (req, res) {
  const user = req.params.user;
  const time = req.body.time;
  if (time == "in") {
    Record.findOneAndUpdate(
      { user: user },
      { entry: [{ date: currentDay }] },
      function (err, found) {
        res.redirect("/" + user);
      }
    );
  } else {
    Record.findOne({ user: user }, function (err, found) {
      console.log(time);
      res.redirect("/" + user);
    });
  }
});

///////////////////////////////////// REGISTRATION ///////////////////////////
app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  const user = req.body.employeeName;
  const pin = req.body.pin;
  console.log(user);
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
