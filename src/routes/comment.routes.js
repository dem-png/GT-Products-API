import { Router } from "express";
import * as commentController from "../controllers/comment.controller.js";

const router = Router();


router.get("/", commentController.getAllComments);

export default router;