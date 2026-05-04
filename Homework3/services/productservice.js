const  Product  = require("../models/ProductModel");

const createProduct = async(productData) => {
    const product = await Product(productData);

    return product.save();
};

module.exports = {
    createProduct
};
