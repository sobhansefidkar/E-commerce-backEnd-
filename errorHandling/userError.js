import Joi from "joi"

export const validator = (data) => {
    const schema = Joi.object({
        username : Joi.string().min(3).max(15),
        password : Joi.string(),
        phone : Joi.string().min(11).max(11)
    })
    const {error} = schema.validate(data)
    if(error){
        return error.message
    }else{
        return data
    }
}
export const loginValidator = (data) => {
    const schema = Joi.object({
        password : Joi.string(),
        phone : Joi.string().min(11).max(11)
    })
    return schema.validate(data)
}