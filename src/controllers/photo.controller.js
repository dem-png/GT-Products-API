import { parse } from 'dotenv';
import * as photoService from '../services/photo.service.js';
import ApiError from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from 'express-async-handler';

export const uploadPhoto = asyncHandler(async (req, res) => {
    if (!req.file) {
        throw new ApiError(400, 'Please upload a file');
    }

    const { caption } = req.body;
    const userId = req.user.id;
    const filePath = req.file.path;

    const photoData = { caption, filePath, userId };
    const photo = await photoService.createPhoto(photoData);

    res.status(201).json(new ApiResponse(201, photo, 'Photo uploaded successfully'));
});

export const getUserPhotos = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const photos = await photoService.getPhotosByUserId(userId);
    res.status(200).json(new ApiResponse(200, photos, 'User photos retrieved successfully'));
});

export const deleteUserPhoto = asyncHandler(async (req, res) => {
    const photoId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    await photoService.deletePhoto(photoId, userId);
    res.status(200).json(new ApiResponse(200, null, 'Photo deleted successfully'));
});
