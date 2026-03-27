//This file defines API endpoints for authentication.

import express from "express";      // Import the Express library to create a router for authentication routes
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();       //Creates a mini router

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);      //Import controller functions



export default router;
