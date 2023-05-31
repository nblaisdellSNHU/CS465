var express = require("express");
var router = express.Router();
const jwt = require("express-jwt");
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload",
  algorithms: ["HS256"],
});

const mainCtrl = require("../controllers/trips");
const authCtrl = require("../controllers/authentication");

// Defines the methods used for logging in
router.route("/login").post(authCtrl.login); // POST the auth info for a user to log in

router.route("/register").post(authCtrl.register); // POST the auth info to create a new user

// Defines the methods available on the '/trips' endpoint
router
  .route("/trips")
  .get(mainCtrl.tripsList) // GET a list of trips from the database
  .post(auth, mainCtrl.tripsAddTrip); // POST a new trip to the database

// Defines the methods available on the '/trips/:tripCode' endpoint
router
  .route("/trips/:tripCode")
  .get(mainCtrl.tripsFindByCode) // GET a particular trip from the database
  .put(auth, mainCtrl.tripsUpdateTrip) // PUT (edit) a particular trip
  .delete(auth, mainCtrl.tripsDeleteTrip); // DELETE a particular trip

module.exports = router;
