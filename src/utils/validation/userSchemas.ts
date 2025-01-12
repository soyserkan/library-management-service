import Joi from 'joi';

export const getUserSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
});

export const createUserSchema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
});

export const borrowBookSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    bookId: Joi.number().integer().positive().required(),
});

export const returnBookParamsSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    bookId: Joi.number().integer().positive().required(),
});

export const returnBookBodySchema = Joi.object({
    score: Joi.number().positive().required(),
});
