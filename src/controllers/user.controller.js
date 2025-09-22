import * as userService from '../services/user.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from 'express-async-handler';

export const createUser = asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(201).json(new ApiResponse(201, user, 'User created successfully'));
});

export const getUserById = asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(new ApiResponse(200, user, 'User retrieved successfully'));
});

export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await userService.getAllUsers();
    res.status(200).json(new ApiResponse(200, users, 'Users retrieved successfully'));
});

export const getPostsByUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const posts = await postService.getpPostsByAuthorId(userId);
    res.status(200).json(new ApiResponse(200, posts, 'Posts retrieved successfully'));
});

export const getCommentsByPost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.parns.postId, 10);
    const { text, authorId } = req.body;
    const newComment = await commentService.createCommentForPost(postId, { text, authorId });
    res.status(201).json(new ApiResponse(201, newComment, 'Comment created successfully'));
});