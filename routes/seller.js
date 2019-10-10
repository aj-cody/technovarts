var express = require("express");
var router = express.Router();
var Item = require("../models/seller");

router.get("/seller/form", function (req, res, item) {
    res.render("./seller/sellForm", {item: item});
});

router.post("/seller/form", function (req, res) {
    // read the img file from tmp in-memory location
    // var newImg = fs.readFileSync(req.file.path);
    // encode the file as a base64 string.
    // var encImg = newImg.toString('base64');

    var newItem = {
        productName: req.body.productName,
        expiryDay: req.body.expiryDay,
        expiryMonth: req.body.expiryMonth,
        expiryYear: req.body.expiryYear,
        mrp: req.body.mrp,
        quantity: req.body.quantity,
        contactNo: req.body.contactNo,
        address: req.body.address,
        image: req.body.image
        // size: req.file.size,
        // image: Buffer(encImg, 'base64')
    };
    Item.create(newItem, function (err, newItem) {
        if (err) {
            res.render("./seller/sellForm");
        } else {
            res.redirect("/home");
        }
    })
});

module.exports = router;