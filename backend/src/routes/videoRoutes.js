import express from "express";
import { uploadVideo } from "../controllers/videoController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload", protect, uploadVideo);

export default router;

import { fetchVideos } from "../controllers/videoController.js";

router.get("/", fetchVideos);

import { fetchSingleVideo } from "../controllers/videoController.js";

router.get("/:id", fetchSingleVideo);
