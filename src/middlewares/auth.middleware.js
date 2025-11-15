import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';                      // use default import
import asyncHandler from 'express-async-handler';
import { getUserById } from '../services/user.service.js';        // include .js extension

export const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            if (!process.env.JWT_SECRET) {
                throw new ApiError(500, 'JWT_SECRET is not configured. Please check your .env file.');
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await getUserById(decoded.id);

            next();
        } catch (error) {
            throw new ApiError(401, 'Not authorized, token failed');
        }
    }

    if (!token) {
        throw new ApiError(401, 'Not authorized, no token');
    }
});