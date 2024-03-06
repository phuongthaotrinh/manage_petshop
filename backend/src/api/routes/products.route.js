import express from 'express'
import * as ProductController from "../controllers/product.controller"
import {getDetailProducts} from "../controllers/product.controller";

const router = express.Router();

// [POST] /api/product/create-product
router.post('/product/create-product', ProductController.createProduct)

router.get('/product/get-list', ProductController.getListProducts);
router.get('/product/get-detail/:id', ProductController.getDetailProducts);


export default router