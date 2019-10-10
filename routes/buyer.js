var express = require("express");
var router = express.Router();
var Item = require("../models/seller");

router.get("/home", function (req, res) {
    Item.find({}, function (err, allItems) {
        if (err) {
            console.log(err);
        } else {
            res.render("./buyer/buyerHome", {items: allItems});
        }
    });
});

router.get("/home/:id", function (req, res) {
    //find the campground with provided  ID
    Item.findById(req.params.id, function (err, foundItem) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundItem);
            //render show template with that item
            res.render("./buyer/show", {item: foundItem});
        }
    });
});

module.exports = router;