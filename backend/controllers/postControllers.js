import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import ImageKit from "imagekit";

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

  let slug = req.body.title.replace(/ /g, "-").toLowerCase();
  let uniqueSlug = slug;
  let counter = 2;

  let existingPost = await Post.findOne({ slug: uniqueSlug });

  while (existingPost) {
    uniqueSlug = `${slug}-${counter}`;
    existingPost = await Post.findOne({ slug: uniqueSlug });
    counter++;
  }

  const newPost = new Post({ user: user._id, slug: uniqueSlug, ...req.body });

  const post = await newPost.save();
  res.status(200).json(post);
};

export const deletePost = async (req, res, next) => {
  const clerkUserId = req.auth.userId;
  if (!clerkUserId) {
    return res.status(401).json("not authenticated");
  }

  const user = await User.findOne({ clerkUserId });
  let deletedPost;

  if (user.role === "admin") {
    deletedPost = await Post.findOneAndDelete({ _id: req.params.id });
  } else {
    deletedPost = await Post.findOneAndDelete({
      _id: req.params.id,
      user: user._id,
    });
  }

  if (!deletedPost) {
    return res.status(403).json("you can delete only your posts!");
  }

  res.status(200).json("blog has been deleted");
};

export const editPost = async (req, res, next) => {
  const { id } = req.params;

  const clerkUserId = req.auth.userId;
  if (!clerkUserId) {
    return res.status(401).json("not authenticated");
  }
  const user = await User.findOne({ clerkUserId });

  if (!user) {
    return res.status(404).json("User not found");
  }

  const post = await Post.findOneAndUpdate(
    { _id: id, user: user._id },
    req.body,
    { new: true }
  );
  if (!post) {
    return res.status(403).json("You are not allowed to edit this post");
  }
  res.status(200).json(post);
};

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const uploadAuth = async (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
};
