//This file creates and configures your Express app.

import express from "express";
import cors from "cors";
import videoRoutes from "./routes/videoRoutes.js";

import authRoutes from "./routes/authRoutes.js";    // Importing authentication routes (login/register APIs)
import { errorHandler } from "./middleware/errorMiddleware.js";     // Importing global error handling middleware
import userRoutes from "./routes/userRoutes.js";

import commentRoutes from "./routes/commentRoutes.js";

import playlistRoutes from "./routes/playlistRoutes.js";


const app = express();

// Middleware
app.use(cors());    // Enabling CORS for cross-origin requests
app.use(express.json());// Middleware to parse incoming JSON requests

// Routes
app.use("/api/auth", authRoutes);// Mounting authentication routes at the /api/auth path
app.use("/api/videos", videoRoutes);

// Error Middleware (always at last)
app.use(errorHandler);

export default app;

app.use("/api/users", userRoutes);

app.use("/api/playlists", playlistRoutes);

app.use("/api/comments", commentRoutes);
