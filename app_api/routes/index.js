var express = require("express");
var router = express.Router();
const ctrlMain = require("../controllers/trips");

// Defines the methods available on the '/trips' endpoint
router
  .route("/trips")
  .get(ctrlMain.tripsList) // GET a list of trips from the database
  .post(ctrlMain.tripsAddTrip); // POST a new trip to the database

// Defines the methods available on the '/trips/:tripCode' endpoint
router
  .route("/trips/:tripCode")
  .get(ctrlMain.tripsFindByCode) // GET a particular trip from the database
  .put(ctrlMain.tripsUpdateTrip) // PUT (edit) a particular trip
  .delete(ctrlMain.tripsDeleteTrip); // DELETE a particular trip

module.exports = router;
