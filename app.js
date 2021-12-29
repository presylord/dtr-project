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

///////////////////////////////////// REGISTRATION ///////////////////////////
app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  const user = req.body.employeeName;
  const pin = req.body.pin;
  const newUser = new Record({
    user: user,
    pin: pin,
  });

  newUser.save(function (err) {
    if (!err) {
      console.log("Employee added succesfully.");
      res.redirect("/");
    } else {
      console.log(err);
    }
  });
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
      console.log(err);
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////

app.get("/:user", function (req, res) {
  const user = req.params.user;
});

app.post("/:user", function (req, res) {
  const user = req.params.user;
  const time = req.body.time;

  if (time == "in") {
    entry.user = user;
    entry.date = currentDay;
    entry.timeIn = currentTime;
    console.log(entry);
    Record.findOneAndUpdate(
      { user: user },
      {
        entry: [entry],
      },
      function (err, found) {
        res.redirect("/" + user);
      }
    );
  } else if (time == "out") {
    entry.timeOut = currentTime;
    console.log(entry);
    Record.findOneAndUpdate(
      { user: user, timeOut: "" },
      {
        entry: [entry],
      },
      function (err, found) {
        res.redirect("/" + user);
      }
    );
  }
});

app.listen(3000, function () {
  console.log("Server started at port 3000.");
});
