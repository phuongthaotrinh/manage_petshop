import WeightModel from "../models/weight.model";
import createHttpError from "http-errors";



export const createUseDefaultData = async (payload) => {
    try {
        console.log("services", payload)
        const data = await WeightModel.insertMany(payload,{
            ordered: true
        })
        return data
    } catch (error) {
        throw error;
    }
};


export const createWeight = async (payload) => {
    try {
        const isExist = await WeightModel.exists({ name: payload.name });
        if (!isExist) throw createHttpError.BadRequest(`Post cannot be duplicated!`);
        const data = await WeightModel.create({ ...payload });
        return data;

    } catch (error) {

    }
}

export const getAllWeight = async () => {
    const data = await WeightModel.find();

    return data
}