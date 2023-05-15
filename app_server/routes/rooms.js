var express = require("express");
var router = express.Router();
const ctrl = require("../controllers/rooms");

/* GET home page. */
router.get("/", ctrl.rooms);

module.exports = router;
