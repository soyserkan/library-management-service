import { Request, Response, NextFunction } from 'express';

const statusCodeMappings = (err: Error) => {
    const errorStatusMap: Record<string, number> = {
        NotFoundError: 404,
        BadRequestError: 400,
    };

    const errorName = err.constructor.name;
    return errorStatusMap[errorName] || 500;
}

export const ErrorHandlerMiddleware = (err: Error, _req: Request, res: Response, next: NextFunction) => {
    const errorDescription = err.message || err;
    const statusCode = statusCodeMappings(err);

    res.status(statusCode).json({ error: errorDescription });
    next();
};