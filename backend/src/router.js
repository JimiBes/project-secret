const express = require("express");

const productController = require("./controllers/productController");

const router = express.Router();

router.get("/products", productController.getAllProducts);
router.post("/products", productController.addProduct);

module.exports = router;
