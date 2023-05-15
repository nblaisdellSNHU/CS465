var express = require("express");
var router = express.Router();
const ctrl = require("../controllers/news");

/* GET home page. */
router.get("/", ctrl.news);

module.exports = router;
