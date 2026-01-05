import { Request, Response, NextFunction } from 'express';

/**
 * Standard HTTP Exception class
 */
export class HttpException extends Error {
    public status: number;
    public message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

/**
 * Global Error Handler Middleware
 */
export const errorMiddleware = (
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';

    console.error(`[Error] ${status} - ${message}`);

    res.status(status).json({
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    });
};
