import CategoriesModel from "../models/categories.model";
import createHttpError from "http-errors";
import slugify from "slugify";
import redisClient from "../../database/redis";
import _ from 'lodash';

const getSubcategoriesRecursively = async (parentId) => {
    const subcategories = await CategoriesModel.find({ parent: parentId });
    const subcategoriesData = [];

    for (const subcategory of subcategories) {
        const subcategoryObj = await getCategoryHierarchy(subcategory);
        subcategoriesData.push(subcategoryObj);
    }

    return subcategoriesData;
};

const getCategoryHierarchy = async (category) => {
    const categoryObj = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        status: category.status,
        images: category.images,
        children:[]
    };

    const subCategories = await getSubcategoriesRecursively(category._id);
    if (subCategories.length > 0) {
        categoryObj.children = subCategories;
    }

    return categoryObj;
};

const findCategoryById = (id, categories) => {
    for (const category of categories) {
        if (category._id == id) {
            return category;
        }
        if (category.children && category.children.length > 0) {
            const foundCategory = findCategoryById(id, category.children);
            if (foundCategory) {
                return foundCategory;
            }
        }
    }
    return null;
};



export const createNewCategories = async (payload) => {
    const isCategoryExist = await CategoriesModel.exists({ name: payload.name });
    if (isCategoryExist) {
        throw createHttpError.BadRequest(`Category cannot be duplicated!`);
    }
    const newCategory = await CategoriesModel.create({
        ...payload,
        slug: slugify(payload.name),
    });
    //
    // await redisClient.del('all-categories')
    // await redisClient.set(`category:${newCategory._id}`, JSON.stringify(newCategory));
    // const newList = await getAllCategoriesV2();
    // await redisClient.set('all-categories', JSON.stringify(newList));
    return  newCategory

};



export const getAllCategoriesV2 = async () => {
    try {
        // const redisData = await redisClient.get("all-categories");
        // const allKeys = await redisClient.keys("*");
        //
        // if(redisData) {
        //     return {
        //         data: JSON.parse(redisData),
        //         allKeys
        //     }
        //
        // }else{
            const categoriesWithoutParent = await CategoriesModel.find({ parent: { $exists: false } });

        const categoriesData = [];

            for (const category of categoriesWithoutParent) {
                const categoryObj = await getCategoryHierarchy(category);
                categoriesData.push(categoryObj);
            }

            // await redisClient.set("all-categories", JSON.stringify(categoriesData));


            //test sendmailHere

            return categoriesData

        // }

    } catch (error) {
        throw error;
    }
};



export const getDetailCategory = async (id, data) => {
    try {
        // const redisData = await redisClient.get("all-categories");
        //
        // if (redisData) {
        //     const categories = JSON.parse(redisData);
        //     const category = findCategoryById(id, categories);
        //     if (category) {
        //         return category;
        //     }
        // }

        const allData = data || await getAllCategoriesV2();
        const category = findCategoryById(id, allData);
        return category;
    } catch (error) {
        throw error;
    }
};


export const updateCategory = async (payload) => {
    const isPostExist = await CategoriesModel.exists({ _id: payload.id });
    if (!isPostExist) {
        throw createHttpError.BadRequest(`Not found category!`);
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