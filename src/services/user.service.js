import dotenv from 'dotenv';
dotenv.config();

import pool from '../config/db.js';
import db from '../config/db.js';
import  ApiError from '../utils/ApiError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (loginData) => {
    const { email, password } = loginData;

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
        throw new ApiError(401, 'Invalid credentials.');
    }
    const user = rows[0];

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new ApiError(401, 'Invalid credentials.');
    }

    const payload = {
        id: user.id,
        username: user.username,
        email: user.email
    };

    if (!process.env.JWT_SECRET) {
        throw new ApiError(500, 'JWT_SECRET is not configured. Please check your .env file.');
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { 
        expiresIn: '1h' 
    });

    return token;
};

export const registerUser = async (userData) => {
    const { username, email, password } = userData;
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const [result] = await pool.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        const newUser = await getUserById(result.insertId);
        return newUser;

    }catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new ApiError(409, 'Username or email already exists.');
        }
        throw error;
    }
};

export async function createUser(userData) {
    const { username, email } = userData;
    if (!username || !email) {
        throw new ApiError(400, 'Username and email are required.');
    }
    try {
        const [result] = await db.execute(
            'INSERT INTO users (username, email) VALUES (?, ?)',
            [username, email]
        );
        return await getUserById(result.insertId);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new ApiError(409, 'Username or email already exists.');
        }
        throw error;
    }
};

export const getUserById = async (id) => {
    const [rows] = await pool.query('SELECT id, username, email, createdAt FROM users WHERE id = ?', [id]);
    if (rows.length === 0) {
        throw new ApiError(404, 'User not found.');
    }
    return rows[0];
};

export const getAllUsers = async () => {
    const [users] = await pool.query('SELECT id, username, email, createdAt FROM users');
    return users;
};

export async function getPostsByAuthorId(userId) {
    const [posts] = await pool.query('SELECT * FROM posts WHERE authorId = ?', [userId]);
    return posts;
};

export const createCommentForPost = async (postId, { text, authorId }) => {
    try {
        const [result] = await db.execute(
            'INSERT INTO comments (postId, text, authorId) VALUES (?, ?, ?)',
            [postId, text, authorId]
        );
        
        return { id: result.insertId, postId, text, authorId };
    } catch (error) {
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            throw new ApiError(400, 'Invalid author ID. User does not exist.');
        }
        throw error;
    }
};
