import { createVideo } from "../services/videoService.js";
import { getAllVideos } from "../services/videoService.js";
import { getVideoById } from "../services/videoService.js";
import { incrementViews } from "../services/videoService.js";


export const uploadVideo = async (req, res, next) => {
  try {
    const { title, description, videoUrl, thumbnailUrl } = req.body;

    const video = await createVideo({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      user: req.user._id,
    });

    res.status(201).json(video);
  } catch (error) {
    next(error);
  }
};


export const fetchVideos = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const videos = await getAllVideos(page, limit);

    res.json({
      page,
      limit,
      results: videos.length,
      videos,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchSingleVideo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const video = await getVideoById(id);

    res.json(video);
  } catch (error) {
    next(error);
  }
};


export const fetchSingleVideo = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Increment views first
    const video = await incrementViews(id);

    // Populate user info after increment
    await video.populate("user", "name avatar");

    res.json(video);
  } catch (error) {
    next(error);
  }
};

import { deleteVideoById } from "../services/videoService.js";

export const deleteVideo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteVideoById(id, req.user._id);

    res.json(result);
  } catch (error) {
    next(error);
  }
};
