const mongoose = require("mongoose");
const model = mongoose.model("trips");

// GET: /trips - List all the trips in the database collection
const tripsList = async (req, res) => {
  model
    .find({}) // get all results in the collection / no filter
    .exec((err, trips) => {
      if (!trips) {
        return res.status(404).json({ message: "trips not found" });
      } else if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json(trips);
      }
    });
};

// GET: /trips/:tripCode - Return a single trip
const tripsFindByCode = async (req, res) => {
  model
    .find({ code: req.params.tripCode }) // Find a specific document, based on the "code" attribute
    .exec((err, trip) => {
      if (!trip) {
        return res.status(404).json({ message: "trip not found" });
      } else if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json(trip);
      }
    });
};

module.exports = {
  tripsList,
  tripsFindByCode,
};
