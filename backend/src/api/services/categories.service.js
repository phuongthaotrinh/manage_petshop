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
    const data= await CategoriesModel.find().populate('totalProduct');
    console.log("daya", data)
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

export const deleteCategory = async (id) => {
    const existedClass = await CategoriesModel.findOne({ _id: id }).populate('totalProduct')
    if (!existedClass) throw createHttpError.NotFound('Cannot find class to delete')
    if (existedClass.totalProduct > 0)
    throw createHttpError.Conflict('Cannot delete category due to there are category in this product !')
    await CategoriesModel.deleteOne({ _id: id })
    return {
        message: 'Category has been permanently deleted',
        statusCode: 200
    }
}
