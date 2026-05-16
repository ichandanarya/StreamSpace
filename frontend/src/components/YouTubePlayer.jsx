import PropTypes from "prop-types";
import "../Css/youtubePlayer.css";

function YouTubePlayer({ videoId, title }) {
  if (!videoId) {
    return (
      <div className="youtube-player-error">
        <p>Unable to load video. Invalid video ID.</p>
      </div>
    );
  }

  return (
    <div className="youtube-player-container">
      <iframe
        className="youtube-player-iframe"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&modestbranding=1&rel=0`}
        title={title || "YouTube Video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

YouTubePlayer.propTypes = {
  videoId: PropTypes.string,
  title: PropTypes.string,
};

export default YouTubePlayer;
