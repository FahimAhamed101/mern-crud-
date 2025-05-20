import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: String,
    description: String,
    price: {
        type: Number,
        required: true
    },
    oldPrice: Number,
    image: {
        type: String,
        required: true
    },
    color: String,
 
   
}, {
    timestamps: true
})

const Products = mongoose.model("Product", productSchema);
export default Products;