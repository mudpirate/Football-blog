import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const trimmedQuery = query.trim();
      if (location.pathname === "/posts") {
        setSearchParams({
          ...Object.fromEntries(searchParams.entries()),
          search: trimmedQuery,
        });
      } else {
        setSearchParams({ search: trimmedQuery });
      }
    }
  };
  return (
    <div className=" md:w-50 lg:block   ">
      <div className="flex items-center px-2 py-2 bg-gray-50 w-full dark:text-white dark:bg-black   rounded-lg sm:px-4 sm:py-3 focus-within:bg-white focus-within:ring-2 transition-all duration-200">
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
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="ml-3 bg-transparent outline-none text-gray-900 placeholder-gray-500 text-sm w-full"
        />
      </div>
    </div>
  );
};

export default Search;
