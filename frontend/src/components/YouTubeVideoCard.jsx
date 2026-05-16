import { useNavigate } from "react-router-dom";
import "../Css/youtubeVideoCard.css";

function YouTubeVideoCard({ video }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (video.videoId) {
      navigate(`/youtube-watch/${video.videoId}`, { state: { videoData: video } });
    }
  };

  if (!video || !video.videoId) {
    return null;
  }

  return (
    <div className="youtube-video-card" onClick={handleClick}>
      <div className="youtube-video-thumbnail">
        <img
          src={video.thumbnail}
          alt={video.title}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/320x180?text=No+Image";
          }}
        />
      </div>
      <div className="youtube-video-info">
        <h3 className="youtube-video-title">{video.title}</h3>
        <p className="youtube-video-channel">{video.channelTitle}</p>
        {video.publishedAt && (
          <p className="youtube-video-date">
            {new Date(video.publishedAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}

export default YouTubeVideoCard;
