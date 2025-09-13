import { json } from 'express';
import * as commentService from '../services/comment.service.js';

export const getAllComments = (req, res) => {
    const comments = commentService.getAllComments();
    res.json(comments);
};

export const getCommentsByPostId = (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const comments = commentService.getCommentsByPostId(postId);
    res.json(comments);
};


export const createCommentForPost = (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: 'Comment text is required.' });
    }

    const newComment = commentService.createCommentForPost(postId, { text });

    if (!newComment) {
        return res.status(404).json({ message: 'Post not found.' });
    }

    res.status(201).json(newComment);
};