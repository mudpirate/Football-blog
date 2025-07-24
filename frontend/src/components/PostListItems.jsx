import React from "react";
import Image1 from "./Image.jsx";
import { useNavigate } from "react-router-dom";

const PostListItems = ({ post }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/posts/${post.slug}`)}
      className="max-w-6xl mx-auto px-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
        <article
          key={post.id}
          className="bg-white flex rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        >
          <div className="flex-shrink-0 w-48 h-48">
            <Image1
              src={post.image}
              w=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-gray-300 px-3 py-1 rounded-full text-xs font-semibold">
                  {post.category}
                </span>
                <span className="text-gray-500 text-sm">{post.date}</span>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                {post.title}
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {post.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-xs font-medium">JD</span>
                </div>
                <span className="text-sm text-gray-700 font-medium">
                  {post.author}
                </span>
              </div>

              <button className="bg-black hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                Read More
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostListItems;
