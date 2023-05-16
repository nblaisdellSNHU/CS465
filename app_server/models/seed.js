const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const seed = async function () {
  // Seed the "Trips" data manually
  // Do so by erasing the data in the "trips" collection in the MongoDB database
  // and manually re-enter the trip data from our "data/trips.json" file.

  // By doing so, this will not persist changes with each run, and the results will
  // be reset each time the app starts up again
  const trips = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../data/trips.json"), "utf-8")
  );
  console.log("trips from JSON", trips);
  const colTrip = mongoose.model("trips");
  await colTrip.deleteMany();
  await colTrip.insertMany(trips);
};

module.exports = {
  seed,
};
