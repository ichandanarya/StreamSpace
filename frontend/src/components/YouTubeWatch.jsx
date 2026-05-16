import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import YouTubePlayer from "./YouTubePlayer";
import Navbar from "./Navbar";
import LeftPanel from "./LeftPanel";
import "../Css/youtubeWatch.css";

function YouTubeWatch() {
  const { videoId } = useParams();
  const location = useLocation();
  const videoData = location.state?.videoData || null;
  const [theme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  useEffect(() => {
    document.title = videoData?.title
      ? `${videoData.title} - YouTube`
      : `Watch - YouTube`;
  }, [videoData?.title]);

  if (!videoId) {
    return (
      <div className={`youtube-watch ${theme ? "dark" : "light"}`}>
        <Navbar />
        <div className="youtube-watch-error">
          <p>Invalid video ID</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`youtube-watch ${theme ? "dark" : "light"}`}>
      <Navbar />
      <div className="youtube-watch-container">
        <LeftPanel />
        <div className="youtube-watch-content">
          <div className="youtube-watch-player">
            <YouTubePlayer videoId={videoId} title={videoData?.title} />
          </div>

          <div className="youtube-watch-info">
            <h1 className="youtube-watch-title">
              {videoData?.title || "Loading..."}
            </h1>

            <div className="youtube-watch-meta">
              <span className="youtube-watch-channel">
                {videoData?.channelTitle || "Unknown Channel"}
              </span>
              {videoData?.publishedAt && (
                <span className="youtube-watch-date">
                  {new Date(videoData.publishedAt).toLocaleDateString()}
                </span>
              )}
            </div>

            {videoData?.description && (
              <div className="youtube-watch-description">
                <h3>Description</h3>
                <p>{videoData.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YouTubeWatch;
