import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import ImageKit from "imagekit";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const getPosts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("user", "username")
    .limit(limit)
    .skip((page - 1) * limit);

  const totalPosts = await Post.countDocuments();
  const hasMore = page * limit < totalPosts;

  res.status(200).json({ posts, hasMore });
};

export const getPost = async (req, res, next) => {
  const { slug } = req.params;
  const post = await Post.findOne({ slug }).populate("user", "username img");
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

  let counter = 2;

  let existingPost = await Post.findOne({ slug });

  while (existingPost) {
    slug = `${slug}-${counter}`;
    existingPost = await Post.findOne({ slug });
    counter++;
  }

  const newPost = new Post({ user: user._id, slug, ...req.body });

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
  const { token, expire, signature } = imagekit.getAuthenticationParameters();
  res.send({
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  });
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log(
  "Gemini Key Loaded:",
  process.env.GEMINI_API_KEY ? "✅" : "❌ Missing"
);

export const generateAI = async (req, res) => {
  try {
    console.log("📥 Full body:", req.body);
    const { prompt } = req.body;
    console.log("📥 Prompt received:", prompt);

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);

    // ✅ No need to await result.response
    const text = await result.response.text(); // ✅ Await this
    console.log("🧠 Gemini result:", result);
    res.json({ response: text }); // ✅
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ error: "Failed to get response from Gemini" });
  }
};
