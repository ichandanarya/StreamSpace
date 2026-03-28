import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get profile
router.get("/profile", protect, getUserProfile);

// Update profile
router.put("/profile", protect, updateUserProfile);

export default router;
