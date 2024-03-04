import PetsModel from "../models/pets.model";
import createHttpError from "http-errors";
import NewsModel from "../models/news.model";
import {toSentenceCase} from "../../helpers/toSentenceCase"
export const createNewPets = async (payload) => {
    const isPostExist = await PetsModel.exists({ name: payload.name });
    if (isPostExist) {
        throw createHttpError.BadRequest(`Post cannot be duplicated!`);
    }
    const payloadData = {
        ...payload,
        name:toSentenceCase(payload.name)
    }
    return  await PetsModel.create(payloadData);

};

export const getAllPets = async () => {
    const data = await PetsModel.find()
    return data
}

export const editPets = async(payload) =>{
    const filter =  { _id: payload._id }
    return  await PetsModel.findOneAndUpdate(filter, payload,{new: true, upsert: true});
}

export const deletePet = async (payload) => {
    const data = PetsModel.deleteOne({
        _id: payload._id
    })
    return data

}