import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

const Sidebar = () => {
  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Search</h2>
        <Search />
      </div>
      {/* Filters Section */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Filters</h2>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="radio"
              name="sort"
              value="newest"
              className="appearance-none w-4 border-[1.5px] h-4 cursor-pointer rounded-sm bg-white checked:bg-black"
            />
            <span>Newest</span>
          </label>
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="radio"
              className="appearance-none w-4 border-[1.5px] h-4 cursor-pointer rounded-sm bg-white checked:bg-black"
            />
            <span>Most Popular</span>
          </label>
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="radio"
              className="appearance-none w-4 border-[1.5px] h-4 cursor-pointer rounded-sm bg-white checked:bg-black"
            />
            <span>Trending</span>
          </label>
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="radio"
              className="appearance-none w-4 border-[1.5px] h-4 cursor-pointer rounded-sm bg-white checked:bg-black"
            />
            <span>Oldest</span>
          </label>
        </div>
      </div>
      {/* Categories Section */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Categories</h2>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/posts"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full  hover:text-white transition-colors duration-200 font-medium"
          >
            All
          </Link>
          <Link
            to="/posts?cat=players"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full  hover:text-white transition-colors duration-200 font-medium"
          >
            Players
          </Link>
          <Link
            to="/posts?cat=legends"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full  hover:text-white transition-colors duration-200 font-medium"
          >
            Legends
          </Link>
          <Link
            to="/posts?cat=matches"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full  hover:text-white transition-colors duration-200 font-medium"
          >
            Matches
          </Link>
          <Link
            to="/posts?cat=leagues"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full  hover:text-white transition-colors duration-200 font-medium"
          >
            Leagues
          </Link>
          <Link
            to="/posts?cat=young-stars"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full  hover:text-white transition-colors duration-200 font-medium"
          >
            Young Stars
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
