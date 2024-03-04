import CategoriesModel from "../models/categories.model";
import createHttpError from "http-errors";
import slugify from "slugify";

export const createNewCategories = async (payload) => {
    const isPostExist = await CategoriesModel.exists({ name: payload.name });
    if (isPostExist) {
        throw createHttpError.BadRequest(`Post cannot be duplicated!`);
    }

    return await CategoriesModel.create({
        ...payload,
        slug: slugify(payload.name),
    });
};
export const getAllCategories = async () => {
    const data= await CategoriesModel.find({});
    return data
};


export const getOneCategory = async (payload) => {
    const isPostExist = await CategoriesModel.exists({ _id: payload.id });
    if (!isPostExist) {
        throw createHttpError.BadRequest(`Not found brand!`);
    }
    const data = await CategoriesModel.findOne({_id: payload.id});
    return data

}
export const updateCategory = async (payload) => {
    const isPostExist = await CategoriesModel.exists({ _id: payload.id });
    if (!isPostExist) {
        throw createHttpError.BadRequest(`Not found brand!`);
    }
    const data = await CategoriesModel.updateOne({_id: payload.id}, payload, {new: true});
    return data

}
