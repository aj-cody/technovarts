var mongoose = require("mongoose"),
    Item = require("./models/seller");

var data = [
    {
        productName: "Butter",
        expiryDay: 12,
        expiryMonth: 11,
        expiryYear: 2019,
        mrp: 300,
        quantity: 5,
        address: "4/abc street: xyz, pqr",
        image: "https://cdn.grofers.com/app/images/products/full_screen/pro_160.jpg"
    },
    {
        productName: "Mayonnaise",
        expiryDay: 8,
        expiryMonth: 11,
        expiryYear: 2019,
        mrp: 250,
        quantity: 8,
        address: "abc-8, xyz",
        image: "https://images-na.ssl-images-amazon.com/images/I/818-exI6lkL._SL1500_.jpg"
    },
    {
        productName: "Packed Peas",
        expiryDay: 2,
        expiryMonth: 12,
        expiryYear: 2019,
        mrp: 200,
        quantity: 5,
        address: "xyz-4, abc",
        image: "https://images-na.ssl-images-amazon.com/images/I/81xaOVRwinL._SX522_.jpg"
    }
];

function seedDB() {
    //Remove all campgrounds
    Item.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Removed items!");

        //add a few campgrounds
        data.forEach(function (seed) {
            Item.create(seed, function (err, item) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Added a item");
                }
            })
        });
    });
}

module.exports = seedDB;