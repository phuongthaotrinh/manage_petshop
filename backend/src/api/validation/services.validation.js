import Joi from 'joi';


export const validateNewService = (payload) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		desc: Joi.string().required(),
		userId: Joi.string().required(),
		status: Joi.boolean().required()
	});
	return schema.validate(payload)
}

export const validateSetServiceOfPet = (payload) => {
	const schema = Joi.object({
		petId: Joi.string().required(),
		serviceId:  Joi.string().required(),
		data:Joi.array().items(Joi.object({
			weightId: Joi.string().required(),
			price: Joi.any()
		})).required()
	});
	return schema.validate(payload)
}