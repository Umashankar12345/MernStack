const mongoose = require("mongoose");

const  productSchema = new mongoose.Schema({
    productName : {
        type: String ,
        required: true
    },
    productprice : {
        type: Number,
        required: true
    },
    productCategory : {
        type: String,
        required: true
    },
    productStock : {
        type: Number,
        required: true
    }

}, {
    timestamps: true  // automatically add create and update At
});

const Product = mongoose.model("product" , productSchema);

module.exports = Product;