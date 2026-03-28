import Playlist from "../models/Playlist.js";
import Playlist from "../models/Playlist.js";
import Video from "../models/Video.js";

export const createPlaylist = async (name, userId) => {
  const playlist = await Playlist.create({
    name,
    user: userId,
    videos: [],
  });

  return playlist;
};


export const addVideoToPlaylist = async (playlistId, videoId, userId) => {
  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new Error("Playlist not found");
  }

  // Ownership check
  if (playlist.user.toString() !== userId.toString()) {
    throw new Error("Not authorized to modify this playlist");
  }

  // Check video exists
  const video = await Video.findById(videoId);
  if (!video) {
    throw new Error("Video not found");
  }

  // Prevent duplicate
  if (playlist.videos.includes(videoId)) {
    throw new Error("Video already in playlist");
  }

  playlist.videos.push(videoId);
  await playlist.save();

  return playlist;
};
export const removeVideoFromPlaylist = async (playlistId, videoId, userId) => {
  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new Error("Playlist not found");
  }

  // Ownership check
  if (playlist.user.toString() !== userId.toString()) {
    throw new Error("Not authorized to modify this playlist");
  }

  // Check if video exists in playlist
  if (!playlist.videos.includes(videoId)) {
    throw new Error("Video not found in playlist");
  }

  // Remove video from array
  playlist.videos = playlist.videos.filter(
    (id) => id.toString() !== videoId.toString()
  );

  await playlist.save();

  return playlist;
};
