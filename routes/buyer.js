var express = require("express");
var router = express.Router();
// var  = require("../models/campground");

router.get("/", function (req, res) {
    res.render("buyer/home");
});

module.exports = router;