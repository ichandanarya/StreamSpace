import { useState } from "react";
import { searchYouTubeVideos, formatVideoData } from "../utils/youtubeUtils";
import YouTubeVideoCard from "./YouTubeVideoCard";
import Navbar from "./Navbar";
import LeftPanel from "./LeftPanel";
import "../Css/youtubeSearch.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BACKEND_URL } from "../config";

function YouTubeSearch() {

  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const [theme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setError("Please enter a search query");
      return;
    }

    setLoading(true);
    setError(null);
    setVideos([]);

    try {
      const result = await searchYouTubeVideos(searchQuery, BACKEND_URL);
      const formattedVideos = formatVideoData(result.videos);
      setVideos(formattedVideos);
      setHasSearched(true);

      if (formattedVideos.length === 0) {
        setError("No videos found. Try a different search.");
      }
    } catch (err) {
      setError(err.message || "Failed to search videos. Please try again.");
      setVideos([]);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`youtube-search ${theme ? "dark" : "light"}`}>
      <Navbar />
      <div className="youtube-search-container">
        <LeftPanel />
        <div className="youtube-search-content">
          <form className="youtube-search-form" onSubmit={handleSearch}>
            <input
              type="text"
              className="youtube-search-input"
              placeholder="Search YouTube videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={loading}
            />
            <button type="submit" className="youtube-search-btn" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {error && <div className="youtube-search-error">{error}</div>}

          <div className="youtube-videos-grid">
            {loading && (
              <SkeletonTheme baseColor="#202020" highlightColor="#444">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="youtube-video-skeleton">
                    <Skeleton height={180} />
                    <Skeleton height={40} style={{ marginTop: "8px" }} />
                    <Skeleton height={20} style={{ marginTop: "8px" }} />
                  </div>
                ))}
              </SkeletonTheme>
            )}

            {!loading &&
              videos.map((video) => (
                <YouTubeVideoCard key={video.videoId} video={video} />
              ))}
          </div>

          {!loading && hasSearched && videos.length === 0 && !error && (
            <div className="youtube-no-results">
              <p>No videos found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default YouTubeSearch;
