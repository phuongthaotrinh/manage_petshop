import CustomersModel from "../models/user.model";
import createHttpError from 'http-errors';
import ServicesModel from "../models/services.model";
import PetsModel from "../models/pets.model";




export const createNewAccount = async (payload) => {
		const existedEmail = await CustomersModel.exists({
					email: payload.email
		})

		if (existedEmail) {
			throw createHttpError.BadRequest(`User email  cannot be duplicated!`)
		}

		return await new CustomersModel({ ...payload }).save()

}

export const getAllCustomers = async (payload) => {
	try {
		return await CustomersModel.find().sort({ createdAt: -1 })
	}catch (error) {
		throw  error
	}
}

export const getUserByEmail = async (email) =>{
	const user =  CustomersModel.findOne({email: email});
	return user
}


