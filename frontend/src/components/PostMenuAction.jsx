import React from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const PostMenuAction = ({ post }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    data: savedPosts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["saved-posts"],
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/saved`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
  });
  const isAdmin = user?.publicMetadata?.role === "admin";

  const isSaved = savedPosts?.some((p) => p._id === post._id);

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return await axios.delete(
        `${import.meta.env.VITE_API_URL}/posts/${post._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Post deleted successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.response?.data || "Failed to delete post");
    },
  });

  const bookmarkMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/users/save/`,
        { postId: post._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-posts"] });
      isSaved
        ? toast.success("Post Removed from bookmarks")
        : toast.success("Post Bookmarked successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data || "Failed to bookmark the post");
    },
  });
  const featureMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/posts/feature/`,
        { postId: post._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["post", post.slug] });
      toast.success(
        data?.isFeatured ? "Post Featured successfully" : "Post Unfeatured"
      );
    },
    onError: (err) => {
      toast.error(err?.response?.data || "Feature update failed");
    },
  });
  const getFeatureFill = () => {
    if (featureMutation.isPending) {
      return post.isFeatured ? "none" : "black";
    }
    return post.isFeatured ? "black" : "none";
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };
  const handleBookmark = () => {
    if (!user) {
      toast.error("Please login to save this post");
      return;
    }

    bookmarkMutation.mutate();
  };

  const handleFeature = () => {
    featureMutation.mutate();
  };

  const fillColor =
    bookmarkMutation.isPending && !isSaved
      ? "black"
      : isSaved
      ? "black"
      : "none";

  return (
    <div className="flex justify-start mb-3 gap-3">
      <div
        className="flex items-center gap-2 py-2 text-sm cursor-pointer"
        onClick={handleBookmark}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="20px"
          height="20px"
        >
          <path
            className="fill-black dark:fill-white"
            d="M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z"
            stroke="black"
            strokeWidth="2"
            fill={fillColor}
          />
        </svg>
        <span>Save this Post</span>
        {bookmarkMutation.isPending && <span>(in progress)</span>}
      </div>

      {(post?.user?.clerkUserId === user?.user_id || isAdmin) && (
        <div
          onClick={handleDelete}
          className="flex justify-center items-center cursor-pointer gap-1"
        >
          {/* Delete Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 30 30"
          >
            <path
              className="fill-black dark:fill-white"
              d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"
            ></path>
          </svg>
          <span>Delete this post</span>
          {deleteMutation.isPending && <span>(in progress)</span>}
        </div>
      )}

      {isAdmin && (
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={handleFeature}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
          >
            <path
              d="M24 2L29.39 16.26L44 18.18L33 29.24L35.82 44L24 37L12.18 44L15 29.24L4 18.18L18.61 16.26L24 2Z"
              stroke="black"
              strokeWidth="2"
              fill={getFeatureFill()}
            />
          </svg>
          <span>Feature this post</span>
          {featureMutation.isPending && (
            <span className="text-xs">(in progress)</span>
          )}
        </div>
      )}
    </div>
  );
};

export default PostMenuAction;
