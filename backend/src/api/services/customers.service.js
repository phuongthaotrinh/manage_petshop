import CustomersModel from "../models/user.model";
import createHttpError from 'http-errors';
import ServicesModel from "../models/services.model";
import PetsModel from "../models/pets.model";




export const createNewAccount = async (payload) => {
		const existedTeacher = await CustomersModel.exists({
			$or: [
				{
					email: payload.email
				},
				{
					phoneNumber: payload.phoneNumber
				},
				{
					username: payload.username
				}
			]
		})
		if (existedTeacher) {
			throw createHttpError.BadRequest(`User email, phone number or username cannot be duplicated!`)
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


