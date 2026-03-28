import express from "express";
import { createComment } from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { fetchComments } from "../controllers/commentController.js";
import { deleteComment } from "../controllers/commentController.js";

const router = express.Router();

router.post("/:videoId", protect, createComment);

export default router;

router.get("/:videoId", fetchComments);

router.delete("/:commentId", protect, deleteComment);
