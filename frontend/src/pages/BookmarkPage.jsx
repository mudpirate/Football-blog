import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const BookmarkPage = () => {
  const { getToken } = useAuth();

  const {
    data: savedPosts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookmark-posts"],
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

  if (isLoading)
    return <div className="p-6 text-center">🔄 Loading bookmarks...</div>;

  if (isError) {
    toast.error("Failed to fetch bookmarks");
    return (
      <div className="p-6 text-center text-red-600">
        ❌ Something went wrong.
      </div>
    );
  }

  if (!savedPosts || savedPosts.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        📭 You have no saved posts.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-center mb-8">
          Your Bookmarked Posts{" "}
        </h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {savedPosts.map((post) => (
          <Link
            to={`/posts/${post.slug}`}
            key={post._id}
            className="block rounded-xl overflow-hidden shadow hover:shadow-md transition duration-200 border dark:bg-black border-gray-200 bg-white"
          >
            {post.img && (
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold dark:text-white mb-2 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                {post.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookmarkPage;
