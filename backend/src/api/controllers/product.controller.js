import 'dotenv/config';
import createHttpError from 'http-errors';
import {useCatchAsync} from "../../helpers/useCatchAsync";
import {validateNewPets} from "../validation/pets.validation";
import * as ProductService from "../services/product.service";
import {HttpStatusCode} from "../../configs/statusCode.config";
import {getListProduct} from "../services/product.service";


// [POST] /api/product/create-product


export const createProduct = useCatchAsync(async (req, res) => {
    try {
        const data = await ProductService.createProduct(req.body)
        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});


export const getListProducts = useCatchAsync(async (req, res) => {
    try {
        const data = await ProductService.getListProduct()
        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});
export const getDetailProducts = useCatchAsync(async (req, res) => {
    try {
        const data = await ProductService.getDetailProduct(req.params)
        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});