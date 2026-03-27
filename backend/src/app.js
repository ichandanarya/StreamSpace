//This file creates and configures your Express app.

import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";    // Importing authentication routes (login/register APIs)
import { errorHandler } from "./middleware/errorMiddleware.js";     // Importing global error handling middleware

const app = express();

// Middleware
app.use(cors());    // Enabling CORS for cross-origin requests
app.use(express.json());// Middleware to parse incoming JSON requests

// Routes
app.use("/api/auth", authRoutes);// Mounting authentication routes at the /api/auth path

// Error Middleware (always at last)
app.use(errorHandler);

export default app;
