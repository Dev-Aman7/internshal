var db = require("./db/setup");
db.connect();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

var login = require("./src/components/login/login");
var signup = require("./src/components/signup/signup");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/login", login);
app.use("/signup", signup);

app.listen(5000, () => {
  console.log("app on 5000");
});

module.exports = app;
