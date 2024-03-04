import Joi from 'joi';


export const validateNewPost = (payload) => {
	const schema = Joi.object({
		name: Joi.string()
			.min(5)
			.max(250)
			.required(),

        images:Joi.array(),
		tags:Joi.array(),
		preview: Joi.string().min(10).required(),
		content:Joi.string().min(10).required(),
		status:Joi.boolean().required(),
        user_id: Joi.any().required(),
	})
	return schema.validate(payload)
}


