var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var hbs = require("hbs");
require("./app_api/models/db");

var indexRouter = require("./app_server/routes/index");
var usersRouter = require("./app_server/routes/users");
var travelRouter = require("./app_server/routes/travel");
var roomsRouter = require("./app_server/routes/rooms");
var newsRouter = require("./app_server/routes/news");
var mealsRouter = require("./app_server/routes/meals");
var contactRouter = require("./app_server/routes/contact");
var aboutRouter = require("./app_server/routes/about");

var apiRouter = require("./app_api/routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "app_server", "views"));

// Needed to use "partials", or the ability to plug in "template" html into
// our "hbs" HTML files, allowing us to reducing the amount of repeated coding
hbs.registerPartials(path.join(__dirname, "app_server", "views/partials"));

// Helper function which can be used in our .hbs files
// This function will allow me to check for equality, used in the "header" partial file
hbs.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Add the rest of the pages, and point to their respective
// routers for displaying the appropriate view/html
app.use("/", indexRouter);
app.use("/index", indexRouter);
app.use("/users", usersRouter);
app.use("/travel", travelRouter);
app.use("/rooms", roomsRouter);
app.use("/news", newsRouter);
app.use("/meals", mealsRouter);
app.use("/contact", contactRouter);
app.use("/about", aboutRouter);

app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
