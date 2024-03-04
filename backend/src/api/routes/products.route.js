import express from 'express'
import * as ProductController from "../controllers/product.controller"

const router = express.Router();

// [POST] /api/product/create-product
router.post('/product/create-product', ProductController.createProduct)

export default router