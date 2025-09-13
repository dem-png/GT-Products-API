import { body,validationResult } from 'express-validator';

export const validatePost = [

    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required'),

    body('content')
        .trim()
        .notEmpty()
        .withMessage('Content is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];