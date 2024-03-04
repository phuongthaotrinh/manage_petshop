import express from 'express'
import * as ProductController from "../controllers/product-attribute.control";


const router = express.Router();

    router.post(`/products-attribute/create-attribute`, ProductController.createAttribute);
    router.get(`/products-attribute/get-attributes`, ProductController.getAllProductAttributes);
    router.patch(`/products-attribute/update-attributes`, ProductController.updateAttribute);
export default router