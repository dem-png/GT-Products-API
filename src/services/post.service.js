import pool from '../config/db.js';
import ApiError from '../utils/ApiError.js';

let posts = [
    {id: 1, Title: "First Post", Content: "This is the first post."},
    {id: 2, Title: "Second Post", Content: "This is the second post."},
];
let nextID = 3;

export const getAllPosts = async () => {
    const [posts] = await pool.query(`
        SELECT
            p.id,
            p.title,
            p.content,
            p.authorId,
            u.username AS authorUsername,
            u.email AS authorEmail
        FROM
            posts p
        JOIN
            users u ON p.authorId = u.id
    `);
    return posts;
};

export const getPostById = async (id) => {
    const [rows] = await pool.query(`
        SELECT
            p.id,
            p.title,
            p.content,
            p.authorId,
            u.username AS authorUsername,
            u.email AS authorEmail
        FROM
            posts p
        JOIN
            users u ON p.authorId = u.id
        WHERE
            p.id = ?
    `, [id]);
    return rows[0];
};

export const createPost = async (postData) => {
    const { title, content, authorId } = postData;
    try {
        const [result] = await pool.query(
            'INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)',
            [title, content, authorId]
        );
        const newPostId = result.insertId;
        return getPostById(newPostId);
    } catch (error) {
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            throw new ApiError(400, 'Invalid author ID. User does not exist.');
        }
        throw error;
    }
};

export const updatePost = async (id, postData) => {
    const { title, content } = postData;;
    const [result] = await pool.query(
        'UPDATE posts SET title = ?, content = ? WHERE id = ?',
        [title, content, id] 
    );
    
    if (!rows[0]) {
        throw new ApiError(404, 'Post not found');
    }
    return rows[0];
};

export const partiallyUpdatePost = async (id, updates) => {
    const fields = Object.keys(updates);
    const values = Object.values(updates);

    if (fields.length === 0) {
        return getPostById(id);;
    }
    
    const setClause = fields.map(field => `${field} = ?`).join(', ');

    const [result] = await pool.query(
        `UPDATE posts SET ${setClause} WHERE id = ?`,  
        [...values, id]
    );

    if (!rows[0]) {
        throw new ApiError(404, 'Post not found');
    }
    return rows[0];
};

export const deletePost = async (id) => {
    const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [id]);
    if (!rows[0]) {
        throw new ApiError(404, 'Post not found');
    }
    return rows[0];
};
