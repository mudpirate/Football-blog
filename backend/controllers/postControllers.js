import Post from "../models/postModel.js";
import User from "../models/userModel.js";

export const getPosts = async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json(posts);
};

export const getPost = async (req, res, next) => {
  const { slug } = req.params;
  const post = await Post.findOne({ slug });
  res.status(200).json(post);
};

export const createPost = async (req, res, next) => {
  const clerkUserId = req.auth.userId;
  if (!clerkUserId) {
    return res.status(401).json("not authenticated");
  }

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    return res.status(404).json("User not found");
  }

  const newPost = new Post({ user: user._id, ...req.body });
  const post = await newPost.save();
  res.status(200).json(post);
};

export const deletePost = async (req, res, next) => {
  const clerkUserId = req.auth.userId;
  if (!clerkUserId) {
    return res.status(401).json("not authenticated");
  }

  const user = await User.findOne({ clerkUserId });

  const deletedPost = await Post.findOneAndDelete({
    _id: req.params.id,
    user: user._id,
  });

  if (!deletePost) {
    return res.status(403).json("you can delete only your posts!");
  }

  res.status(200).json("blog has been deleted");
};
