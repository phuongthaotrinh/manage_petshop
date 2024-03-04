import createHttpError from "http-errors";

import ProductModel from "../models/product.model";
import ProductOptionModel from "../models/productOption.model";
import ProductImageModel from "../models/productImages.model";
import ProductOptionValueModel from "../models/productOptionValue.model";
import ImageModel from "../models/images.model";
import ProductVariantModel from "../models/productVariant.model";

 // ======== Product  ========

 const uploadImages = async (payload) => {
    console.log("payload", payload);
    if(Array.isArray(payload)) {
        return await ImageModel.insertMany(payload)
    }else{
        return await ImageModel.create(payload)
    }
}



export const createProduct= async (payload) => {
        if(payload.gallaries) {
           await uploadImages(payload.gallaries)
        }

};