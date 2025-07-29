import express from "express";
import {
  getUserSavedPosts,
  savePosts,
} from "../controllers/userControllers.js";

const router = express.Router();

router.get("/saved", getUserSavedPosts);
router.patch("/save", savePosts);

export default router;
