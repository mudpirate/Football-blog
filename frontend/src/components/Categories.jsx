import React from "react";
import { Link } from "react-router-dom";
import Image1 from "./Image";

const Categories = () => {
  return (
    <>
      <div className="relative  ">
        <Image1
          src="/category.jpg"
          className="h-[30vh] object-cover object-bottom w-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              {" "}
              Discover the latest in football news and analysis
            </h1>
          </div>
        </div>
      </div>

      <div className="flex justify-center mx-10 rounded-xl items-center h-full mb-3 bg-white shadow-lg border border-gray-200 -mt-8 relative z-10">
        {/* Header */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-black">Categories</h2>
        </div>

        {/* Navigation Links */}
        <div className="p-4 ">
          <nav className="flex flex-wrap gap-3">
            <Link
              to="/posts"
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium shadow-sm"
            >
              All Blogs
            </Link>
            <Link
              to="/posts?cat=players"
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium shadow-sm"
            >
              Players
            </Link>
            <Link
              to="/posts?cat=matches"
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium shadow-sm"
            >
              Matches
            </Link>
            <Link
              to="/posts?cat=league"
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium shadow-sm"
            >
              Leagues
            </Link>
            <Link
              to="/posts?cat=transfers"
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium shadow-sm"
            >
              Transfers
            </Link>
            <Link
              to="/posts?cat=young-stars"
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium shadow-sm"
            >
              Young Stars
            </Link>
          </nav>
        </div>

        {/* Search Section */}
        <div className="p-2 gap-2">
          <div className="flex items-center rounded-lg px-3 py-2 bg-gray-100 border border-gray-300 focus-within:bg-white focus-within:border-black transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 30 30"
              fill="#6B7280"
              className="flex-shrink-0"
            >
              <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
            </svg>
            <input
              type="text"
              placeholder="Search blogs..."
              className="w-full ml-2 bg-transparent outline-none text-gray-900 placeholder-gray-500 text-sm"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
