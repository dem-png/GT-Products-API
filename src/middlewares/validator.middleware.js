import { body, validationResult } from 'express-validator';

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