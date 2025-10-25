import * as commentService from '../services/comment.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from 'express-async-handler';

// Get all comments
export const getAllComments = asyncHandler(async (req, res) => {
    const comments = await commentService.getAllComments();
    res.status(200).json(new ApiResponse(200, comments, 'Comments retrieved successfully'));
});

// Get comments by post ID
export const getCommentsByPostId = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const comments = await commentService.getCommentsByPostId(postId);
    res.status(200).json(new ApiResponse(200, comments, 'Comments for post retrieved successfully'));
});

// Create a comment for a post
export const createCommentForPost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const { text, authorId } = req.body;
    const newComment = await commentService.createComment(postId, authorId, { text });
    res.status(201).json(new ApiResponse(201, newComment, 'Comment created successfully'));
});