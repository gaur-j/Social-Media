import postModel from "../models/postSchema.js";

// ✅ Create Post
const createPost = async (req, res) => {
  const { text } = req.body;
  const image = req.file?.path;
  const userId = req.user;

  if (!text && !image) {
    return res.status(400).json({
      success: false,
      message: "Post must include text or an image",
    });
  }

  try {
    const post = await postModel.create({
      user: userId,
      text,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Post uploaded successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ✅ Get All Posts
const getPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("user", "username avatar")
      .populate("comments.user", "username avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Get Posts by Logged-In User
const getPostsByUser = async (req, res) => {
  const userId = req.user;

  try {
    const posts = await postModel.find({ user: userId });

    res.status(200).json({
      success: true,
      posts,
      message: posts.length ? "Posts retrieved successfully" : "No posts found",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Update Post
const updatePost = async (req, res) => {
  const { text } = req.body;
  const postId = req.params.id;
  const userId = req.user;

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (post.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this post",
      });
    }

    post.text = text || post.text;
    post.image = req.file?.path || post.image;

    const updatedPost = await post.save();

    res.status(200).json({ success: true, updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Delete Post
const deletePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user;

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (post.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this post",
      });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Like / Unlike Post
const toggleLike = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user;

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: alreadyLiked ? "Post unliked" : "Post liked",
      likes: post.likes.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Add Comment
const addComment = async (req, res) => {
  const postId = req.params.id;
  const { text } = req.body;
  const userId = req.user;

  if (!text) {
    return res
      .status(400)
      .json({ success: false, message: "Comment text is required" });
  }

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const newComment = { user: userId, text };
    post.comments.push(newComment);
    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export {
  createPost,
  getPosts,
  getPostsByUser,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
};
