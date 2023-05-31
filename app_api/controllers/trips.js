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

// POST: /trips - Add a new trip to the database
const tripsAddTrip = async (req, res) => {
  model.create(
    {
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    },
    (err, trip) => {
      if (err) {
        return res.status(400).json(err);
      } else {
        return res.status(201).json(trip);
      }
    }
  );
};

// PUT: /trips/:tripCode - Update/Edit an existing trip
const tripsUpdateTrip = async (req, res) => {
  console.log(req.body);
  model
    .findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
      },
      { new: true }
    )
    .then((trip) => {
      if (!trip) {
        return res
          .status(404)
          .send({ message: "Trip not found with code " + req.params.tripCode });
      }
      res.status(200).send(trip);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res
          .status(404)
          .send({ message: "Trip not found with code " + req.params.tripCode });
      }
      return res.status(500).json(err); // server error
    });
};

const tripsDeleteTrip = async (req, res) => {
  console.log(req.body);
  model.deleteOne({ code: req.params.tripCode }, {}).then((response) => {
    console.log("deleted...", response);
    return res.status(200);
  });
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip,
};
