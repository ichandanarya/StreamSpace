import { addComment } from "../services/commentService.js";

import { getCommentsByVideo } from "../services/commentService.js";

import { deleteCommentById } from "../services/commentService.js";

export const createComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    const { videoId } = req.params;

    const comment = await addComment(text, req.user._id, videoId);

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const fetchComments = async (req, res, next) => {
  try {
    const { videoId } = req.params;

    const comments = await getCommentsByVideo(videoId);

    res.json({
      count: comments.length,
      comments,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const result = await deleteCommentById(commentId, req.user._id);

    res.json(result);
  } catch (error) {
    next(error);
  }
};
