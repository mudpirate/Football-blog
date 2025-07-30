import React from "react";
import Image1 from "./Image.jsx";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import { useUser } from "@clerk/clerk-react";

const PostListItems = ({ post }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${post.slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full mt-4  mb-4 cursor-pointer transition-transform duration-300"
    >
      <article className="bg-white mx-3 w-90 md:w-[95vw] :md:px-1 dark:bg-black border shadow-lg hover:shadow-md hover:scale-[1.01] transition-all duration-200 flex flex-col md:flex-row overflow-hidden">
        {/* Image Section (unchanged) */}
        <div className="w-full border-red-500 flex justify-center md:w-80 h-68 flex-shrink-0">
          <Image1
            src={post.img}
            className="w-full h-68 object-cover object-center"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          {/* Top Meta */}
          <div className="mb-3">
            <div className="flex flex-wrap items-center gap-3 mb-2 text-xs">
              <span className="px-2 py-1 rounded-full bg-gray-200 dark:text-black font-semibold capitalize">
                {post.category}
              </span>
              <span className="text-gray-500">{format(post.createdAt)}</span>
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold dark:text-white text-gray-900 mb-2 line-clamp-2">
              {post.title}
            </h2>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base line-clamp-3">
              {post.desc}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <span>Written by </span>
              <span className="font-medium capitalize">
                {post.user?.username || "Admin"}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:scale-105 transition"
            >
              Read More
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostListItems;
