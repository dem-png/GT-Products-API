import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import * as commentController from '../controllers/comment.controller.js';
import { validateComment } from '../middlewares/validator.middleware.js';

const router = Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/:userId/posts', userController.getPostsByUser);
router.post('/:userId/posts/:postId/comments', validateComment, commentController.createCommentForPost);

export default router;