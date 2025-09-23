import pool from '../config/db.js';
import ApiError from '../utils/ApiError.js';

export const getAllComments = async () => {
    const [comments] = await pool.query('SELECT * FROM comments');
    return comments;
};

export const getCommentsByPostId = async (postId) => {
    const [comments] = await pool.query('SELECT * FROM comments WHERE post_id = ?', [postId]);
    return comments;
};

export const createComment = async (postId, getPostsByAuthorId, commentData) => {
    const { text } = commentData;
    try {
        const [result] = await pool.query('INSERT INTO comments (postId, authorId, text) VALUES (?, ?, ?)',
            [postId, getPostsByAuthorId, text]
        );
        const [rows] = await pool.query('SELECT * FROM comments WHERE id = ?', [result.insertId]);
        return rows[0];
    } catch (error) {
        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            throw new ApiError(400, "Invalid postId or authorId. The specified post or user does not exist.");
        }
        throw error;
    }
};