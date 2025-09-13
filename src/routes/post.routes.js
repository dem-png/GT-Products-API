import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';
import * as commentController from '../controllers/comment.controller.js';
import { validatePost } from '../middlewares/validator.middleware.js';

const router = Router();

router.get('/', postController.getAllPosts);
router.post('/', validatePost, postController.createPost);
router.get('/:id', postController.getPostById);
router.put('/:id', validatePost, postController.updatePost);
router.patch('/:id', postController.partiallyUpdatePost);
router.delete('/:id', postController.deletePost);

router.get('/:postId/comments', commentController.getCommentsByPostId);
router.post('/:postId/comments', commentController.createCommentForPost);

export default router;