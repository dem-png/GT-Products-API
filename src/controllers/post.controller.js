import * as postService from '../services/post.service.js';

export const getAllPosts = async (req, res) => {
    try {
    const posts = await postService.getAllPosts();
    res.json(posts);
    } catch (error) {
        res.staus(500).json({ message: 'Error retrieving posts', error: error.message }); 
    }
};

export const getPostById = async (req, res) => {
    try {
    const postId = parseInt(req.params.id, 10);
    const post = await postService.getPostById(postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' }); 
    }
    res.json(post);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving post', error: error.message });
    }
};

export const createPost = async (req, res) => {
    try {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and Content are required' });
    }
    const newPost = await postService.createPost({ title, content });
    res.status(201).json(newPost); 
    } catch (error) {
        return res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
    const postId = parseInt(req.params.id, 10);
    const post = await postService.updatePost(postId, req.body);
    if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.json(post);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating post', error: error.message });
    }    
};

export const partiallyUpdatePost = async (req, res) => {
    try {
    const postId = parseInt(req.params.id, 10);
    const post = await postService.partiallyUpdatePost(postId, req.body);
    if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.json(post);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating post', error: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
    const postId = parseInt(req.params.id, 10);
    const success = await postService.deletePost(postId);
    if (!success) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
};

