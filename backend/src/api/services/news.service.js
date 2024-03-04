import slugify from 'slugify';
import NewsModel from './../models/news.model';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import CustomersModel from "../models/user.model";

export const createNewPostServie = async (payload) => {
    const isPostExist = await NewsModel.exists({ name: payload.name });
    if (isPostExist) {
        throw createHttpError.BadRequest(`Post cannot be duplicated!`);
    }

    return await NewsModel.create({
        ...payload,
        slug: slugify(payload.name),
    });
};


export const getAllPost = async (payload) => {
    const data = await NewsModel.find()
    return data
}

export const getOnePost = async (payload) => {
    const id = payload.id;
    if (!id) {
        throw createHttpError.BadRequest(`Id cannot be null!`);
    }

    const data = await NewsModel.findOne({_id: id}).exec();
    if(!data) throw createHttpError.BadRequest(`Object not exist!`);
    return data
}

export const editPost = async (payload) => {
    const existedData = await NewsModel.exists({  _id: payload.id  })
    if (!existedData) {
        throw createHttpError.BadRequest(`Not found Object`)
    }
    return await NewsModel.updateOne({_id: payload.id}, payload,{ new:true})
};


export const deletePost = async (payload) => {
        const data = NewsModel.deleteOne({
            _id: payload.id
        })
        return data

}
