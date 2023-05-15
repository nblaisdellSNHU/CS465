var express = require("express");
var router = express.Router();
const ctrl = require("../controllers/meals");

/* GET home page. */
router.get("/", ctrl.meals);

module.exports = router;
