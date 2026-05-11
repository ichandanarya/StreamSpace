// YouTube utility functions for fetching and managing video data

// Extract videoId from various YouTube URL formats
export const extractVideoId = (url) => {
  if (!url) return null;

  // Direct videoId
  if (typeof url === "string" && url.length === 11 && /^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }

  // youtube.com/watch?v=VIDEO_ID
  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(youtubeRegex);

  return match ? match[1] : null;
};

// Search YouTube videos through backend
export const searchYouTubeVideos = async (query, backendURL) => {
  try {
    if (!query || !query.trim()) {
      throw new Error("Search query is required");
    }

    const response = await fetch(`${backendURL}/youtube/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchQuery: query.trim(),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to search videos");
    }

    const data = await response.json();

    return {
      videos: data.items || [],
      nextPageToken: data.nextPageToken || null,
      prevPageToken: data.prevPageToken || null,
    };
  } catch (error) {
    console.error("❌ YouTube Search Error:", error.message);
    throw error;
  }
};

// Get video information (title, thumbnail, etc.)
export const getVideoInfo = (video) => {
  if (!video) return null;

  return {
    videoId: video.videoId || null,
    title: video.title || "Untitled",
    description: video.description || "",
    thumbnail: video.thumbnail || "",
    channelTitle: video.channelTitle || "Unknown Channel",
    publishedAt: video.publishedAt || new Date().toISOString(),
  };
};

// Format video data for display
export const formatVideoData = (videos) => {
  if (!Array.isArray(videos)) return [];

  return videos
    .filter((video) => video.videoId)
    .map((video) => ({
      ...getVideoInfo(video),
      embedUrl: `https://www.youtube.com/embed/${video.videoId}`,
    }));
};
