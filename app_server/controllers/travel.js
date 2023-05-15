var fs = require("fs");
var trips = JSON.parse(fs.readFileSync("./data/trips.json"));

const travel = (req, res) => {
  console.log("trips", trips);
  res.render("travel", { title: "Travlr Getaways", trips });
};

module.exports = {
  travel,
};
