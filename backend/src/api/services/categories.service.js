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
   
    const existList = await redisClient.exists("all-categories");
    
    if(!existList) {
        await getAllCategoriesV2();
    }else{
    
        if(!payload.parent) {
            await redisClient.RPUSH("all-categories", JSON.stringify(newCategory))
        }else{
            await redisClient.del("all-categories").then(async() => {
                await getAllCategoriesV2();
          })
        }
    }

    await redisClient.set(`category:${newCategory._id}`, JSON.stringify(newCategory))

    return  newCategory

};


export const getAllCategoriesV2 = async () => {
    try {
        const existData = await redisClient.exists('all-categories');
        
        if(existData) {
            const allCategories = await redisClient.LRANGE("all-categories", 0, -1);
            const decodedCategories = allCategories.map(JSON.parse);
            return {
                data: decodedCategories
            }
        
        }else{
            const categoriesWithoutParent = await CategoriesModel.find({ parent: { $exists: false } });
            const categoriesData = [];
                for (const category of categoriesWithoutParent) {
                    const categoryObj = await getCategoryHierarchy(category);
                    categoriesData.push(categoryObj);
                }
                

                for (const category of categoriesData) {
                    await redisClient.LPUSH("all-categories", JSON.stringify(category));
                }

                return categoriesData

            }

    } catch (error) {
        throw error;
    }
};

export const getDetailCategory = async (id) => {
    try {
       const existCate = await redisClient.get(`category:${id}`);      
       if(existCate){
            return JSON.parse(existCate)
       }
       else
       {
            const {data} = await getAllCategoriesV2()
             const cate =  findCategoryById(id,data);
        
            if(cate) {
               await redisClient.set(`category:${id}`, JSON.stringify(cate))
                return cate 
            }else{
                return null
            }
            
       }
       
    } catch (error) {
        console.log("error",error)
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
const handleDelete = async(id) => {
    const existedClass = await CategoriesModel.findOne({ _id: id }).populate('totalProduct');

    if (!existedClass) throw createHttpError.NotFound('Cannot find categories to delete');

    if (existedClass.totalProduct > 0){
        throw createHttpError.Conflict('Cannot delete category due to there are category in this product !')
    }else{
        await CategoriesModel.deleteOne({ _id: id })
        return {
            message: 'Category has been permanently deleted',
            statusCode: 200
        }
    }
}

export const deleteCategory = async (id) => {
    try {
        const existRedisCate = await redisClient.get(`category:${id}`);      
    
    if(!existRedisCate) {
        return await handleDelete(id)
    }else{
        await redisClient.del(`category:${id}`);
        await redisClient.del("all-categories");
        await handleDelete(id);
        await getAllCategoriesV2();
    }
    } catch (error) {
        console.log("error",error)
    }

}