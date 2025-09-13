import pool from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

let posts = [
    {id: 1, Title: "First Post", Content: "This is the first post."},
    {id: 2, Title: "Second Post", Content: "This is the second post."},
];
let nextID = 3;

export const getAllPosts = async () => {
    const [posts] = await pool.query('SELECT  * FROM posts');
    return posts;
};

export const getPostById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
    if (!rows[0]) {
        throw new ApiError(404, 'Post not found');
    }
    return rows[0];
};

export const createPost = async (postData) => {
    const { title, content } = postData;;
    const [result] = await pool.query(
        'INSERT INTO posts (title, content) VALUES (?, ?)',
        [title, content] 
    );
    const newPostId = result.insertId;
    return getPostById(newPostId);  
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
