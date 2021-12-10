const express = require("express");
const _ = require("lodash");
const ejs = require("ejs");

const app = express();
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

///////////////////////////// Database ///////////////////////////

const users = [];
const entries = [];

console.log(users);

///////////////////////////////////// REGISTRATION ///////////////////////////
app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  const user = req.body.employeeName;
  const pin = req.body.pin;

  users.push({
    user: user,
    pin: pin,
    entries: [],
  });
  console.log(users);
  res.redirect("/");
});
///////////////////////////////////// Functions ////////////////////////////////////
app.get("/", function (req, res) {
  res.render("home");
});

app.post("/", function (req, res) {
  const name = req.body.employeeName;
  const pin = req.body.pin;
  console.log(users[0].user);
  for (var x = 0; x == users.length; x++) {
    if (users[x].user == name && users[x] == pin) {
      var login = true;
    }
  }
  if (login == true) {
    res.redirect("/" + name);
  } else {
    res.redirect("/");
    console.log("Wrong User or Password!");
  }
});

///////////////////////////////////////////////////////////////////////////////////

app.get("/:user", function (req, res) {
  const user = req.params.user;
  res.render("dtr", { user: user });
  // Record.findOne({ user: user }, function (err, record) {
  //   res.render("dtr", {
  //     user: user,
  //     // date: record.entry.date,
  //     // timeIn: record.entry.timeIn,
  //     // timeOut: record.entry.timeOut,
  //   });
  // });
});

app.post("/:user", function (req, res) {
  const user = req.params.user;
  const time = req.body.time;

  if (time == "in") {
    // Record.findOneAndUpdate(
    //   { user: user },
    //   {
    //     entry: [
    //       {
    //         date: currentDay,
    //       },
    //     ],
    //   },
    //   function (err, found) {
    //     res.redirect("/" + user);
    //   }
    // );
  }
  // try making the entries into a different array
  else if (time == "out") {
    // Record.findOneAndUpdate(
    //   { user: user, timeOut: "" },
    //   {
    //     entry: {
    //       date: date,
    //       timeIn: timeIn,
    //       timeOut: currentTime,
    //     },
    //   },
    //   { new: true },
    //   function (err, found) {
    //     res.redirect("/" + user);
    //   }
    // );
  }
});

app.listen(3000, function () {
  console.log("Server started at port 3000.");
});
