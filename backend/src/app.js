// This file creates and configures your Express app.

const express = require("express");
const cors = require("cors");

const videoRoutes = require("./routes/videoRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const playlistRoutes = require("./routes/playlistRoutes");

const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/users", userRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/comments", commentRoutes);

// Error Middleware (always last)
app.use(errorHandler);

module.exports = app;
