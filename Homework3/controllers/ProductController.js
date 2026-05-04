const productService = require("../services/productservice");

const addProduct = async (req , res) => {
    try {
        const {productName , productPrice , productCategory , productStock} = req.body;

        if(!productName || !productPrice || !productCategory || !productStock){
            return res.status(400).json({
                success: false,
                message: "All fiels  required"
            });
    }
    const newProduct = await productService.createProduct(req.body);

    res.status(201).json({
        success: true , 
        message: "Produt added",
        data: new Product
    });
} catch (error){
    res.status(500).json({
        success: false ,
        message: error.message
    });
}
};
module.exports = {
    addProduct
};
