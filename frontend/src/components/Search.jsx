import React from "react";

const Search = () => {
  return (
    <div className="relative">
      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400 flex-shrink-0"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          type="text"
          placeholder="Search articles..."
          className="ml-3 bg-transparent outline-none text-gray-900 placeholder-gray-500 text-sm w-full"
        />
      </div>
    </div>
  );
};

export default Search;
