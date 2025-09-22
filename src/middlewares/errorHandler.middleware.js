import  ApiError  from '../utils/ApiError.js';

export const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";

    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    if (statusCode === 500) {
        console.error(err);
    } 

    return res.status(statusCode).json({
        success: false,
        message: message
    });
};