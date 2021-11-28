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
    database: "users",
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//////////////////////////// Current Date ///////////////////////
const date = new Date().toISOString().slice(0, 10);
///////////////////////////////////// REGISTRATION ///////////////////////////
app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  const userName = req.body.userName;
  const pin = req.body.pin;
  db("user_info")
    .insert({
      username: userName,
      pin: pin,
      joined: new Date(),
    })
    .then((response) => {
      res.redirect("/");
    });
});
///////////////////////////////////// Functions ////////////////////////////////////
app.get("/", function (req, res) {
  res.render("home");
});

app.post("/", function (req, res) {
  const username = req.body.userName;
  const pin = req.body.pin;
  db.select("*")
    .from("user_info")
    .where("username", username)
    .andWhere("pin", pin)
    .then((user) => {
      res.redirect("/" + username);
    });
});

///////////////////////////////////////////////////////////////////////////////////

app.get("/:user", function (req, res) {
  const user = req.params.user;

  res.render("dtr", { user: user });
});

app.post("/:user", function (req, res) {
  const user = req.params.user;
  const time = req.body.time;
  if (time == "in") {
    db("user_entry")
      .insert({
        username: user,
        date: currentDay,
        time_in: currentTime,
        time_out: "",
      })
      .then((response) => {
        res.redirect("/" + user);
      });
  } else {
    console.log(err);
  }
});

app.listen(3000, function () {
  console.log("Server started at port 3000.");
  console.log(date);
  console.log(date);
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
