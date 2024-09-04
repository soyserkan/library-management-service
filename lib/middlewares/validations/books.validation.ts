import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const getBookValidation = (req: Request, _res: Response, next: NextFunction) => {
  const schema = Joi.object({
    bookId: Joi.number().integer().positive().required(),
  });
  const result = schema.validate(req.params);
  if (result?.error) {
    next({ message: result.error.details[0].message });
  }
  next();
};

export const createBookValidation = (req: Request, _res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
  });
  const result = schema.validate(req.body);
  if (result?.error) {
    next({ message: result.error.details[0].message });
  }
  next();
};