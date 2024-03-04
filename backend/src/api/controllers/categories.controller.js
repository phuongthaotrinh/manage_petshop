import * as CategorisService from "../services/categories.service";
import {useCatchAsync} from "../../helpers/useCatchAsync";
import {validateGetDetail, validateNewBrand} from "../validation/brand";
import createHttpError from "http-errors";
import {HttpStatusCode} from '../../configs/statusCode.config'
import {getAllBrands} from "../services/brand.service";


// [POST] /api/brands/new-brand
export const createNewCategories = useCatchAsync(async (req, res) => {
    try {
        const { error } = validateNewBrand(req.body);
        if (error) {
            throw createHttpError.BadRequest(error.message);
        }

        const data = await CategorisService.createNewCategories(req.body);

        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

// [GET] /api/brands/get-all-brand
export const getAllCategories = useCatchAsync(async (req, res) => {
    try {
        const data = await CategorisService.getAllCategories();
        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

// [GET] /api/brands/get-brand-by-id/:id
export const getOneCategory= useCatchAsync(async (req, res) => {
    try {
        const { error } = validateGetDetail(req.params);
        if (error) {
            throw createHttpError.BadRequest(error.message);
        }
        const data = await CategorisService.getOneCategory(req.params);
        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

// [PATCH] /api/brands/update-by-id
export const updateCategoryById= useCatchAsync(async (req, res) => {
    try {
        const data = await CategorisService.updateCategory(req.body);
        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});