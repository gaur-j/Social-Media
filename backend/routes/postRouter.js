import express from "express";
import protect from "../middlewares/auth.js";
import {
  createPost,
  getPosts,
  getPostsByUser,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
} from "../controllers/postController.js";
import upload from "../middlewares/multer.js";

const postRouter = express.Router();
postRouter.post("/create", protect, upload.single("image"), createPost);
postRouter.get("/get-posts", getPosts);
postRouter.get("/user-posts", protect, getPostsByUser);
postRouter.put("/posts/:id", protect, upload.single("image"), updatePost);
postRouter.delete("/:id", protect, deletePost);
postRouter.put("/:id/like", protect, toggleLike);
postRouter.post("/:id/comment", protect, addComment);

export default postRouter;
