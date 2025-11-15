import pool from '../config/db.js';
import ApiError from '../utils/ApiError.js';
import fs from 'fs/promises';

export const createPhoto = async (photoData) => {
    const { caption, filePath, userId } = photoData;
    const [result] = await pool.execute(
        'INSERT INTO photos (caption, filePath, userId) VALUES (?, ?, ?)',
        [caption, filePath, userId]
    );
    const [rows] = await pool.query('SELECT * FROM photos WHERE id = ?', [result.insertId]);
    return rows[0];
};

export const getPhotosByUserId = async (userId) => {
    const [photos] = await pool.query('SELECT * FROM photos WHERE userId = ?', [userId]);
    return photos;
};

export const deletePhoto = async (photoId, userId) => {
    const [rows] = await pool.query('SELECT * FROM photos WHERE id = ?', [photoId]);
    if (rows.length === 0) {
        throw new ApiError(404, 'Photo not found');
    }
    const photo = rows[0];

    if (photo.userId !== userId) {
        throw new ApiError(403, 'You do not have permission to delete this photo');
    }
    
    try {
        await fs.unlink(photo.filePath);
    } catch (error) {
        console.error("Failed to dedlete file from filesystem:", error);
    }

    await pool.query('DELETE FROM photos WHERE id = ?', [photoId]);
    return;
};
