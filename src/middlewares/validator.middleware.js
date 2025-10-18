import { body, validationResult } from 'express-validator';
import * as commentService from '../services/comment.service.js';
import ApiResponse from '../utils/ApiError.js'; 
import asyncHandler from 'express-async-handler';

export const validatePost = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required'),

    body('content')
        .trim()
        .notEmpty()
        .withMessage('Content is required'),

    body('authorId')
        .isInt({ min: 1 })
        .withMessage('A valid author ID is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const validateComment = [
    body('text')
        .trim()
        .notEmpty()
        .withMessage('Comment text is required.'),
    body('authorId')
        .isInt({ min: 1 })
        .withMessage('A valid author ID is required.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const validateRegistration = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required.'),

    body('email')
        .isEmail()
        .withMessage('A valid email is required.'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    },
];

export const getAllComments = asyncHandler(async (req, res) => {
    const comments = await commentService.getAllComments();
    res.status(200).json(new ApiResponse(200, comments, 'Comments retrieved successfully'));
});

export const getCommentsByPostId = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const comments = await commentService.getCommentsByPostId(postId);
    res.status(200).json(new ApiResponse(200, comments, 'Comments for post retrieved successfully'));
});

export const createCommentForPost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const { text, authorId } = req.body;
    const newComment = await commentService.createComment(postId, authorId, { text });
    res.status(201).json(new ApiResponse(201, newComment, 'Comment created successfully'));
});