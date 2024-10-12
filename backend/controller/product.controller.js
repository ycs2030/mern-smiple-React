import mongoose from "mongoose";
import Product from "../models/product.model.js";
// this is the way to import underscore checked everything read from https://underscorejs.org/#
import mapss from 'underscore';



export const getProduct = async (request, response) => {
    try {
        const products = await Product.find().lean().exec({});
        //const products = await Product.find({});
        console.log(products);
        response
          .status(200)
          .json( {Success: true,
             Count: products.length,
              data: products} 
            );
    } catch (error) {
        console.log(`Error fetching products: ${error.message}`);
        response.status(500).json({ Success: false ,message: "Internal server error" });
    }
}

export const getProductById = async (request, response) => {
    const { id } = request.params;

    try {
        const product = await Product.findById(id).lean().exec();

        if (!product) {
            return response.status(404).json({ message: "Missing required field(s) is not found" });
        }

        response.status(200).json({ success: true, data: product });
    } catch (error) {
        console.log(`Error fetching product: ${error.message}`);
        response.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const createProduct = async (request, response) => {
    const { name, price, image } = request.body;
    if (!name || !price || !image) {
        return response.status(400).json({ message: "Missing required field(s)" });
    }

    try {
        const newProduct = await Product.create({ name, price, image });
        response.status(201).json({success: true,data: newProduct});
    } catch (error) {
        console.log(`Error creating product: ${error.message}`);
        response.status(500).json({ success: false ,message: "Internal server error" });
    }
}

export const updateProduct = async (request, response) => {
    const { id } = request.params;
    const { name, price, image } = request.body;

    if (!mongoose.Types.ObjectId.isValid(id) || !name || !price || !image) {
        return response.status(400).json({ message: "Missing required field(s)" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, image, "timestamps.updatedAt": Date.now() },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return response.status(404).json({ message: "Product not found" });
        }

        response.status(200).json({ success: true, data: updatedProduct, message: `Product updated successfully ` });
    } catch (error) {
        console.log(`Error updating product: ${error.message}`);
        response.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteProduct = async (request, response) => {
    const id = request.params.id;
    try{
        const product = await Product.findByIdAndDelete(id);
   // if (mapss.isNull(product)) {
    if (!product) {
        return response.status(404).json({ message: "Missing required field(s) is not found" });
    }
    response.status(200).json({success: true,message:"Product deleted successfully"});
    }catch(error){
        console.log(`Error deleting product: ${error.message}`);
        response.status(500).json({ success: false ,message: "Internal server error" });
    }
}
