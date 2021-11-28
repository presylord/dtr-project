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
let current_datetime = new Date();
let dateToday =
  current_datetime.getFullYear() +
  "-" +
  (current_datetime.getMonth() + 1) +
  "-" +
  current_datetime.getDate();

let timeToday =
  current_datetime.getHours() +
  ":" +
  current_datetime.getMinutes() +
  ":" +
  current_datetime.getSeconds();

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
  db("user_entry")
    .insert({
      username: user,
      date: dateToday,
    })
    .then((response) => {
      console.log("logged successfully");
    });
  res.render("dtr", { user: user });
});
app.post("/:user", function (req, res) {
  const user = req.params.user;
  const time = req.body.time;
  if (time == "in") {
    db("user_entry")
      .where("username", "=", user)
      .whereNotNull("date")
      .whereNull("time_in")
      .update({
        time_in: timeToday,
      })
      .catch((err) => console.log(err));
    res.redirect("/" + user);
  } else {
    db("user_entry")
      .where("username", "=", user)
      .whereNotNull("date")
      .whereNull("time_out")

      .update({
        time_out: timeToday,
      })

      .catch((err) => console.log(err));
    res.redirect("/" + user);
  }
});

app.listen(3000, function () {
  console.log("Server started at port 3000.");
});
