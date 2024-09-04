import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const getUserValidation = (req: Request, _res: Response, next: NextFunction) => {
  const schema = Joi.object({
    userId: Joi.number().integer().positive().required(),
  });
  const result = schema.validate(req.params);
  if (result?.error) {
    next({ message: result.error.details[0].message });
  }
  next();
};

export const createUserValidation = (req: Request, _res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
  });
  const result = schema.validate(req.body);
  if (result?.error) {
    next({ message: result.error.details[0].message });
  }
  next();
};

export const barrowBookValidation = (req: Request, _res: Response, next: NextFunction) => {
  const schema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    bookId: Joi.number().integer().positive().required(),
  });
  const result = schema.validate(req.params);
  if (result?.error) {
    next({ message: result.error.details[0].message });
  }
  next();
};

export const returnBookValidation = (req: Request, _res: Response, next: NextFunction) => {
  const paramsValidate = Joi.object({
    userId: Joi.number().integer().positive().required(),
    bookId: Joi.number().integer().positive().required(),
  }).validate(req.params);
  if (paramsValidate?.error) {
    next({ message: paramsValidate.error.details[0].message });
  }

  const bodyValidate = Joi.object({
    score: Joi.number().positive().required(),
  }).validate(req.body);
  if (bodyValidate?.error) {
    next({ message: bodyValidate.error.details[0].message });
  }

  next();
};