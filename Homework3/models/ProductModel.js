const mongoose = require("mongoose");

const  productSchema = new mongoose.Schema({
    productName : {
        type: string ,
        required: true
    },
    productprice : {
        type: Number,
        required: true
    },
    productCategory : {
        type: stringify,
        required: true
    },
    productStock : {
        type: Number,
        required: true
    }

}, {
    timestamps: true
});

const Product = mongoose.model("product" , productSchema);

module.exports = Product;