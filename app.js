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
};

const currentDay = today.toLocaleString("en-US", day);
const currentTime = today.toLocaleString("en-US", time);
console.log(currentTime, currentDay);

app.get("/", function (req, res) {
  res.render("home");
});

app.post("/", function (req, res) {
  console.log(req.body.employeeID);
});

app.listen(3000, function () {
  console.log("Server started at port 3000.");
});
