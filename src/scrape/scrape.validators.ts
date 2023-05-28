import joi from 'joi';

export default {
    store: joi.object({
        id: joi.string().required(),
        code: joi.string().required(),
        min_price: joi.number().required().min(0),
        max_price: joi.number().required().min(0)
    }).required()
}