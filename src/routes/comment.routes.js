import { Router } from "express";
import * as commentController from "../controllers/comment.controller.js";

const router = Router();


router.get("/:postId", commentController.getCommentsByPostId);


router.post("/:postId", commentController.createCommentForPost);

export default router;