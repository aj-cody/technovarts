var express = require("express");
var router = express.Router();

router.get("/form", function (req, res) {
    res.render("./seller/sellForm");
});

module.exports = router;