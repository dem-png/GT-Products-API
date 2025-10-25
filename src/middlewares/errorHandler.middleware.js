import  ApiError  from '../utils/ApiError.js';

export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if (err instanceof ApiError) {
        console.error(err);

        if (process.env.NODE_ENV === 'production') {
            message = "Something went wrong!";
        }
    }
    const response = {
        success: false,
        message: message,
    };
    
    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
    } 

    return res.status(statusCode).json(response);
};
