import express from "express";
import { createNewPlaylist } from "../controllers/playlistController.js";
import { protect } from "../middleware/authMiddleware.js";
import { addVideo } from "../controllers/playlistController.js";
import { removeVideo } from "../controllers/playlistController.js";

const router = express.Router();    

router.post("/", protect, createNewPlaylist);

export default router;


router.post("/:playlistId/videos/:videoId", protect, addVideo);


router.delete("/:playlistId/videos/:videoId", protect, removeVideo);
