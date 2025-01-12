import Joi from 'joi';

export const getBookSchema = Joi.object({
  bookId: Joi.number().integer().positive().required(),
});

export const createBookSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
});