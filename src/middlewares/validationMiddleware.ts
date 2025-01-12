import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validationMiddleware = (schema: Joi.ObjectSchema, property: 'body' | 'params' | 'query' = 'body') =>
    (req: Request, _res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[property], { abortEarly: false });
        if (error) {
            next({ message: error.details[0].message });
        }
        next();
    };