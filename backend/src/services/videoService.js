import Video from "../models/Video.js";

export const createVideo = async (data) => {
  const video = await Video.create(data);
  return video;
};
export const getAllVideos = async (page, limit) => {
  const skip = (page - 1) * limit;

  const videos = await Video.find()
    .populate("user", "name avatar")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return videos;
};
export const getVideoById = async (id) => {
  const video = await Video.findById(id).populate("user", "name avatar");

  if (!video) {
    throw new Error("Video not found");
  }

  return video;
};

export const incrementViews = async (id) => {
  const video = await Video.findById(id);

  if (!video) {
    throw new Error("Video not found");
  }

  video.views += 1;
  await video.save();

  return video;
};

export const deleteVideoById = async (videoId, userId) => {
  const video = await Video.findById(videoId);

  if (!video) {
    throw new Error("Video not found");
  }

  // Ownership check
  if (video.user.toString() !== userId.toString()) {
    throw new Error("Not authorized to delete this video");
  }

  await video.deleteOne();

  return { message: "Video deleted successfully" };
};
