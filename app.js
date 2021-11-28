const express = require("express");
const _ = require("lodash");
const ejs = require("ejs");
const app = express();
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "aptxn4869",
    database: "daily_record",
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

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

///////////////////////////////////// REGISTRATION ///////////////////////////
app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const pin = req.body.pin;
  const email = req.body.email;
  db("users")
    .insert({
      first_name: firstName,
      last_name: lastName,
      email: email,
    })
    .then(console.log("Employee added succesfully."));
  db("login")
    .insert({
      pin: pin,
    })
    .then(console.log("Pin added succesfully."));
});
///////////////////////////////////// Functions ////////////////////////////////////
app.get("/", function (req, res) {
  res.render("home");
});

app.post("/", function (req, res) {
  const name = req.body.employeeName;
  const pin = req.body.pin;
  Record.findOne({ user: name, pin: pin }, function (err, found) {
    if (found) {
      const user = _.lowerCase(found.user);
      res.redirect("/" + user);
    } else {
      console.log("Error in / Post");
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////

app.get("/:user", function (req, res) {
  const user = req.params.user;
  res.render("dtr", {
    user: user,
  });
});

app.post("/:user", function (req, res) {
  const user = req.params.user;
  const time = req.body.time;
  if (time == "in") {
  }
  // try making the entries into a different array
  else {
  }
});

app.listen(3000, function () {
  console.log("Server started at port 3000.");
});

// CREATE TABLE users (
//   user_id SERIAL NOT NULL PRIMARY KEY,
//   first_name VARCHAR(50) NOT NULL,
//   last_name VARCHAR(50) NOT NULL,
//   email VARCHAR(50) NOT NULL
// );

// CREATE TABLE login (
//   id SERIAL NOT NULL PRIMARY KEY,
//   user_id INT NOT NULL,
//   pin INT NOT NULL,
//   FOREIGN KEY (user_id) REFERENCES users(user_id)

// );
