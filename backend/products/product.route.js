import Products from "./products.model.js";
import express from "express";
const router = express.Router();

import {createNewProduct, getAllProducts, getSingleProduct, updateProductById, deleteProductById} from "./product.controller.js"

router.post("/create-product", async (req, res) => {
    try {
      const newProduct = new Products({ ...req.body });
      const savedProduct = await newProduct.save();
      
      res.status(201).send(savedProduct);
    } catch (error) {
      console.log("Error in creating new product", error);
      res.status(400).send({ message: "Failed to create a new product" });
    }
  });
  
  router.post("/create-product", createNewProduct);

  // get all products
  router.get("/", getAllProducts);
  
  // get single product
  router.get("/:id", getSingleProduct);
  
  // update product (admin only)
  router.patch("/update-product/:id",updateProductById)
  
  // delete product (admin only)
  router.delete("/:id",deleteProductById)
  
  export default router