const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

// router.post("/add-product", productController.addProduct);
router.get("/add-product", (req, res) => {
  res.send("Add Product Route Working");
});

module.exports = router;
