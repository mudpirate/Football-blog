import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  uploadAuth,
  generateAI,
  featurePosts,
} from "../controllers/postControllers.js";

import increaseVisit from "../middleware/increaseVisit.js";

const router = express.Router();

router.get("/upload-auth", uploadAuth);

router.get("/", getPosts);
router.get("/:slug", increaseVisit, getPost);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.post("/AI", generateAI);
router.patch("/feature", featurePosts);

export default router;
