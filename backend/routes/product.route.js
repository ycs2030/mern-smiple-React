import express from "express";
import {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.route("/").get(getProduct)
.post(createProduct);

router.route("/:id")
.get(getProductById)
.put(updateProduct)
.delete(deleteProduct);

export default router;