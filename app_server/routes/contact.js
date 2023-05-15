var express = require("express");
var router = express.Router();
const ctrl = require("../controllers/contact");

/* GET home page. */
router.get("/", ctrl.contact);

module.exports = router;
