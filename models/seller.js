var mongoose = require("mongoose");

// SCHEMA SETUP
var itemSchema = new mongoose.Schema({
    productName: String,
    expiryDay: String,
    expiryMonth: String,
    expiryYear: String,
    mrp: String,
    quantity: String,
    contactNo: String,
    address: String,
    image: String,
    created: {type: Date, default: Date.now}
    // image: {
    //     data: Buffer,
    //     contentType: String
    // }
    // comments: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Comment"
    //     }
    // ]
});

module.exports = mongoose.model("Item", itemSchema);
