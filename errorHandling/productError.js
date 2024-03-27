import Joi from "joi";

const productValidator = (data) => {
    const schema = Joi.object({
        title : Joi.string().min(3).max(35).required(),
        desc : Joi.string().required(),
        img : Joi.array(),
        cat : Joi.string().required(),
        price : Joi.required(),
        features : Joi.array(),
        specification : Joi.array(),
        instruction : Joi.string().required(),
        combination : Joi.array(),
        color : Joi.array(),
        discount : Joi.boolean(),
        discountPercent : Joi.number(),
        instock : Joi.boolean()
    })
    return schema.validate(data)
}

export default productValidator