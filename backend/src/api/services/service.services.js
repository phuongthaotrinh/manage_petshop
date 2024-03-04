import createHttpError from 'http-errors';
import mongoose from 'mongoose'

import ServicesModel from "../models/services.model";
import ServiceOfPets from "../models/serviceOfPets";
import PetsModel from "../models/pets.model";
import PusherClient from "../../configs/pusher";

export const createNewServie = async (payload) => {

    const isServiceExist = await ServicesModel.exists({ name: payload.name });
    if (isServiceExist)   throw createHttpError.HTTP_STATUS_BAD_REQUEST(`Service cannot be duplicated!`);

    return ServicesModel.create(payload)
};

export const getAllService = async (payload) => {
    try {
        return await ServicesModel
                    .find()
                    // .sort({ createdAt: -1  })
    }catch (error) {
        throw createHttpError.BadRequest(error);
    }
}


export const getServiceById = async (payload) => {
    const id = payload.id;
    if (!id) throw createHttpError.BadRequest(`Id cannot be null!`);

    return await ServicesModel.findOne({ _id: id  }).exec();

};

export const setServicePriceOfPet  = async (payload) => {
    if(payload.data.length > 0) {
        const mapItem = payload.data.map((i) => {
            return {
                weightId:i.weightId,
                price:i.price,
                petId:payload.petId,
                serviceId:payload.serviceId
            }
        });
       await ServiceOfPets.insertMany(mapItem)
    }
}


export const getServiceByPetId = async (payload) => {
    const existPetId = await PetsModel.findOne({ _id: payload.petId });
    if(!existPetId)  throw createHttpError.BadRequest(`PetId cannot be null!`);
    let allServices = await ServiceOfPets
                                        .find({  petId: payload.petId })
                                        .populate('serviceId')
                                        .populate('weightId')
    let check = Object.groupBy(allServices, ({serviceId}) => serviceId._id)
    return {
        petId:existPetId,
        data:check
    }
}

export const updateServicePriceOfPet  = async (payload) => {
    const bulkOps = payload.map(update => ({
        updateOne: {
            filter: { _id: update.id },
            update: { $set: { price: update.price } },
        }
    }));
    const data =  await ServiceOfPets.bulkWrite(bulkOps);
       await PusherClient.trigger("my-channel", "my-event", {
            message: "Price change now",
        });

    return data
}


export const getServiceOfAllPets = async () => {
    try {
        const pets = await PetsModel.find();
        if(pets) {
            const servicesByPets = [];
            for (const pet of pets) {
                try {
                    const services = await getServiceByPetId({ petId: pet._id });
                    servicesByPets.push(services);
                } catch (error) {
                    console.error(`Error getting services for pet ${pet._id}:`, error.message);
                }
            }

            return servicesByPets;
        }
    }catch (err)  {
            console.log("getServiceOfAllPets fail", err)
    }
}

















export const getServiceByPetIdNewVersion = async (payload) => {


    const data = await ServiceOfPets.aggregate()
        .match({
            petId: new mongoose.Types.ObjectId(payload.petId)
        })
        .lookup({
            from: 'services',
            localField: 'serviceId',
            foreignField: '_id',
            as: 'services',
            pipeline: [
                {
                    $project: {
                        _id: 1,
                        name:1
                    },

                }
            ]
        })
        .unwind('$serviceId')
        .lookup({
            from: 'weights',
            localField: 'weightId',
            foreignField: '_id',
            as: 'weights',
            pipeline: [
                {
                    $project: {
                        _id: 1,
                        name:1
                    }
                }
            ]
        })
        .unwind('$weightId')

    return data
}