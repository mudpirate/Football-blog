import React from "react";
import Image1 from "./Image.jsx";
import { useNavigate, Link } from "react-router-dom";
import { format } from "timeago.js";
import { useUser } from "@clerk/clerk-react";

const PostListItems = ({ post }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const cat = post.category?.toLowerCase();

  const handleClick = () => {
    navigate(`/posts/${post.slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <div
      onClick={handleClick}
      className="flex  mt-2 sm:items-center w-[100vw] mb-4 border-2 cursor-pointer transition-transform duration-300"
    >
      <article className="bg-white h-65 w-[70vw] border  dark:bg-black  shadow-lg hover:shadow-md hover:scale-[1.01] transition-all duration-200 flex flex-col md:flex-row overflow-hidden">
        {/* Image Section */}
        <div className="w-full md:w-80  h-68  flex-shrink-0">
          <Image1
            src={post.img}
            className="w-80 h-68 object-cover object-center"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 pr-9 p-4 px-6 flex flex-col justify-between">
          {/* Top Meta */}
          <div className="mb-3">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-xs  bg-gray-200 dark:text-black font-semibold capitalize">
                {post.category}
              </span>
              <span className="text-xs text-gray-500">
                {format(post.createdAt)}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-semibold dark:text-white text-gray-900 mb-2 line-clamp-2">
              {post.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm dark:text-white md:text-base line-clamp-3">
              {post.desc}
            </p>
          </div>

          {/* Author + Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-white font-medium">
                Written by
              </span>
              <span className="text-black dark:text-white">
                {post?.user?.username || "Admin"}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="bg-black dark:bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:scale-[1.05]   transition"
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
