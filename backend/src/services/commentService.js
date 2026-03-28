import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addComment = async (text, userId, videoId) => {
  // Check if video exists
  const video = await Video.findById(videoId);
  if (!video) {
    throw new Error("Video not found");
  }

  const comment = await Comment.create({
    text,
    user: userId,
    video: videoId,
  });

  return comment;
};
export const getCommentsByVideo = async (videoId) => {
  const comments = await Comment.find({ video: videoId })
    .populate("user", "name avatar")
    .sort({ createdAt: -1 });

  return comments;
};
export const deleteCommentById = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new Error("Comment not found");
  }

  // Ownership check
  if (comment.user.toString() !== userId.toString()) {
    throw new Error("Not authorized to delete this comment");
  }

  await comment.deleteOne();

  return { message: "Comment deleted successfully" };
};
