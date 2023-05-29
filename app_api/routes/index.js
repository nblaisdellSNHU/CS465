var express = require("express");
var router = express.Router();
const ctrlMain = require("../controllers/trips");

/* GET home page. */
router.get("/trips", ctrlMain.tripsList);
router.get("/trips/:tripCode", ctrlMain.tripsFindByCode);

module.exports = router;
