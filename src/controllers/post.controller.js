import * as postService from '../services/post.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asynchandler from 'express-async-handler';

export const getAllPosts = asynchandler(async (req, res) => {
        const posts = await postService.getAllPosts();
        return res
            .status(200)
            .json(new ApiResponse(200, posts, 'Posts retrieved successfully'));
    });

export const getPostById = asynchandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await postService.getPostById(postId);
    
    return res
        .status(404)
        .json(new ApiResponse(200, post, "Post retrieved succesfully")); 
    });

export const createPost = asynchandler(async (req, res) => {
    const authorId = req.user.id;
    const postData = req.body;

    const newPost = await postService.createPost(postData, authorId);
    res.status(201).json(new ApiResponse(201, newPost, 'Post created successfully'));
    });

export const updatePost = async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const postData = req.body;
    const userId = req.user.id;
    
    const updatedPost = await postService.updatePost(postId, postData, userId);
    res.status(200).json(new ApiResponse(200, updatedPost, 'Post updated successfully'));
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

export const deletePost = asynchandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const userId = req.user.id;

    await postService.deletePost(postId, userId);
    res.status(200).json(new ApiResponse(200, null, 'Post deleted successfully'));
});

