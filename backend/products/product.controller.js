import { errorResponse, successResponse } from "./responseHandler.js";
import Products from "./products.model.js";

//create new products
export const createNewProduct=async(req,res)=>{
 try {
    const newProduct =  new Products({
        ...req.body
        
    })
    const savedProduct =  await newProduct.save();
      
    
    return successResponse(res, 200, "Product created successfully", savedProduct)       
 } catch (error) {
    return errorResponse(res, 500, "Failed to create new product", error)
 }
}

//ge all products
export const getAllProducts = async (req, res) => {
    try {
      const { category, color, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
      const filter = {};
      
      if (category && category !== 'all') {
        filter.category = category;
      }
      if (color && color !== 'all') {
        filter.color = color;
      }
      if (minPrice && maxPrice) {
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);
        if (!isNaN(min) && !isNaN(max)) {
          filter.price = { $gte: min, $lte: max };
        }
      }
  
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const totalProducts = await Products.countDocuments(filter);
      const totalPages = Math.ceil(totalProducts / parseInt(limit));
      
      const products = await Products.find(filter)
        .skip(skip)
        .limit(parseInt(limit))
       
        .sort({ createdAt: -1 });
  
      return successResponse(res, 200, "Products fetched successfully", {
        products,
        totalProducts,
        totalPages
      });
      
    } catch (error) {
      return errorResponse(res, 500, "Failed to get all products", error);
    }
  };
//get single products
export const getSingleProduct=async(req,res)=>{
    const {id} = req.params;
   try {
    const product  = await Products.findById(id)
    
    if(!product) {
        return errorResponse(res, 404, "Product not found")
    }
   

    return successResponse(res, 200, "Single Product and reviews ",{product})

   } catch (error) {
    return errorResponse(res, 500, "Failed to get single product", error)
   }
}
//update product
export const updateProductById =async(req,res)=>{
    const productId =  req.params.id;
    try {
        const updatedProduct =  await Products.findByIdAndUpdate(productId, {...req.body}, {
            new: true
        })
        if(!updatedProduct) {
            return errorResponse(res, 404, "Product not found")
        }
        return successResponse(res, 200, "Product updated successfully", updatedProduct)
    } catch (error) {
        return errorResponse(res, 500, "Failed to update", error)
    }
}

//delete product
export const deleteProductById=async(req,res)=>{
    const productId = req.params.id;
    try {
        const deletedProduct = await Products.findByIdAndDelete(productId);

        if(!deletedProduct) {
            return errorResponse(res, 404, "Product not found")
        }
        await Reviews.deleteMany({productId: productId});
        return successResponse(res, 200, "Product deleted successfully")
    } catch (error) {
        return errorResponse(res, 500, "Failed to delete", error)
    }
}