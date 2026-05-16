const express = require("express");
const { env } = require("../config/env");
const router = express.Router();

const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3";

// POST /youtube/search - Search YouTube videos
router.post("/youtube/search", async (req, res) => {
  try {
    if (!env.YOUTUBE_API_KEY) {
      console.error("YouTube API key is not set in environment variables");
      return res.status(500).json({
        error: "YouTube API key not configured on server",
      });
    }

    const query = req.body.query || req.body.searchQuery;
    const pageToken = req.body.pageToken || req.body.page_token || "";

    if (!query || !query.trim()) {
      return res.status(400).json({
        error: "Search query is required",
      });
    }

    const params = new URLSearchParams({
      part: "snippet",
      q: query.trim(),
      type: "video",
      maxResults: "12",
      key: env.YOUTUBE_API_KEY,
    });

    if (pageToken) {
      params.append("pageToken", pageToken);
    }

    const url = `${YOUTUBE_API_BASE_URL}/search?${params}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data?.error?.message || "YouTube API error";
      console.error("YouTube API error:", errorMessage);
      return res.status(response.status).json({ error: errorMessage });
    }

    // Filter and transform results to include proper video data
    const items = Array.isArray(data.items)
      ? data.items
          .filter((item) => item?.id?.videoId)
          .map((item) => ({
            videoId: item.id.videoId,
            title: item.snippet.title || "Untitled",
            description: item.snippet.description || "",
            thumbnail:
              item.snippet.thumbnails?.medium?.url ||
              item.snippet.thumbnails?.default?.url ||
              "",
            channelTitle: item.snippet.channelTitle || "Unknown Channel",
            publishedAt: item.snippet.publishedAt || new Date().toISOString(),
          }))
      : [];

    res.json({
      items,
      nextPageToken: data.nextPageToken || null,
      prevPageToken: data.prevPageToken || null,
    });
  } catch (error) {
    console.error("YouTube search error:", error);
    res.status(500).json({
      error: error.message || "Failed to search YouTube videos",
    });
  }
});

module.exports = router;
