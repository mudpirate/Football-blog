import User from "../models/userModel.js";

export const getUserSavedPosts = async (req, res) => {
  const clerkUserId = req.auth.userId;

  try {
    const user = await User.findOne({ clerkUserId }).populate("savedPosts");
    if (!user) {
      return res.status(404).json("User not found");
    }

    res.status(200).json(user.savedPosts);
  } catch (error) {
    res.status(500).json("Failed to fetch saved posts");
  }
};

export const savePosts = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const { postId } = req.body;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated");
  }

  try {
    const user = await User.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const isSaved = user.savedPosts.some(
      (p) => p.toString() === postId.toString()
    );

    if (!isSaved) {
      await User.findByIdAndUpdate(user._id, {
        $push: { savedPosts: postId },
      });
    } else {
      await User.findByIdAndUpdate(user._id, {
        $pull: { savedPosts: postId },
      });
    }

    res.status(200).json(isSaved ? "Post unsaved" : "Post saved");
  } catch (error) {
    res.status(500).json("Failed to save/unsave post");
  }
};
