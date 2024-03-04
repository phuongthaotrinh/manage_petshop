import express from 'express'
import * as CategoryController  from '../controllers/categories.controller'
const router = express.Router();

// [POST] /api/categories/new-category
router.post('/categories/new-category',CategoryController.createNewCategories);

// [GET] /api/categories/get-all-categories
router.get('/categories/get-all-categories',CategoryController.getAllCategories);

// [GET] /api/categories/get-category-by-id/:id
router.get('/categories/get-category-by-id/:id',CategoryController.getOneCategory);

// [PATCH] /api/categories/update-by-id
router.patch('/categories/update-by-id',CategoryController.updateCategoryById);

router.delete('/categories/remove/:id', CategoryController.removeClass)

export default router
