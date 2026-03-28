import { createPlaylist } from "../services/playlistService.js";
import { addVideoToPlaylist } from "../services/playlistService.js";
import { removeVideoFromPlaylist } from "../services/playlistService.js";

export const createNewPlaylist = async (req, res, next) => {
  try {
    const { name } = req.body;

    const playlist = await createPlaylist(name, req.user._id);

    res.status(201).json(playlist);
  } catch (error) {
    next(error);
  }
};

export const addVideo = async (req, res, next) => {
  try {
    const { playlistId, videoId } = req.params;

    const playlist = await addVideoToPlaylist(
      playlistId,
      videoId,
      req.user._id
    );

    res.json(playlist);
  } catch (error) {
    next(error);
  }
};

export const removeVideo = async (req, res, next) => {
  try {
    const { playlistId, videoId } = req.params;

    const playlist = await removeVideoFromPlaylist(
      playlistId,
      videoId,
      req.user._id
    );

    res.json(playlist);
  } catch (error) {
    next(error);
  }
};
