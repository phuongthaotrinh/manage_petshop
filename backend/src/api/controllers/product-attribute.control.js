import * as ProductService from "../services/product.service";
import createHttpError from "http-errors";
import {HttpStatusCode} from "../../configs/statusCode.config";
import {useCatchAsync} from "../../helpers/useCatchAsync";



// Product Attribute


export const createAttribute  = useCatchAsync(async (req, res) => {
    const {attributes} = req.body;
    if(attributes.length === 0) throw createHttpError.BadRequest('attributes need at least 1 item');
    const data = await ProductService.createProductAttribute(req.body);
    return res.status(HttpStatusCode.CREATED).json(data)
})

export const getAllProductAttributes = useCatchAsync(async (req, res) => {
    const data = await ProductService.getProductAttribute();
    return res.status(HttpStatusCode.OK).json(data)
})

export const updateAttribute  = useCatchAsync(async (req, res) => {
    const data = await ProductService.updateProductAttribute(req.body);
    return res.status(HttpStatusCode.OK).json(data)
})