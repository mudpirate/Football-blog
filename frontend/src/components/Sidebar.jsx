import React from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Search from "./Search";

const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterChange = (e) => {
    if (searchParams.get("sort") !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      });
    }
  };
  const categoryChange = (category) => {
    if (searchParams.get("cat") !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat: category,
      });
    }
  };
  return (
    <div className="md:flex md:justify-between space-y-8">
      {/* Search Section */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          Search
        </h2>
        <Search />
      </div>
      {/* Filters Section */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          Filters
        </h2>
        <div className="flex flex-col md:flex-row md:mt-5 gap-2">
          <label className="flex items-center gap-2 dark:text-white text-gray-700">
            <input
              type="radio"
              name="sort"
              onChange={filterChange}
              value="newest"
              className="appearance-none w-4 border-[1.5px] h-4 cursor-pointer rounded-sm bg-white checked:bg-black"
            />
            <span>Newest</span>
          </label>
          <label className="flex items-center gap-2 dark:text-white text-gray-700">
            <input
              type="radio"
              name="sort"
              value="mostPopular"
              onChange={filterChange}
              className="appearance-none w-4 border-[1.5px] h-4 cursor-pointer rounded-sm bg-white checked:bg-black"
            />
            <span>Most Popular</span>
          </label>
          <label className="flex items-center gap-2 dark:text-white text-gray-700">
            <input
              type="radio"
              name="sort"
              onChange={filterChange}
              value="trending"
              className="appearance-none w-4 border-[1.5px] h-4 cursor-pointer rounded-sm bg-white checked:bg-black"
            />
            <span>Trending</span>
          </label>
          <label className="flex items-center gap-2 dark:text-white text-gray-700">
            <input
              type="radio"
              name="sort"
              value="oldest"
              onChange={filterChange}
              className="appearance-none w-4 border-[1.5px] h-4 cursor-pointer rounded-sm bg-white checked:bg-black"
            />
            <span>Oldest</span>
          </label>
        </div>
      </div>
      {/* Categories Section */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          Categories
        </h2>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/posts"
            onClick={() => categoryChange("General")}
            className="px-4 py-2 bg-gray-100 text-gray-700 border rounded-full  hover:bg-gray-200 transition-colors duration-200 font-medium"
          >
            All
          </Link>
          <Link
            to="/posts?cat=Players"
            onClick={() => categoryChange("Players")}
            className="px-4 py-2 bg-gray-100 text-gray-700 border rounded-full  hover:bg-gray-200 transition-colors duration-200 font-medium"
          >
            Players
          </Link>
          <Link
            to="/posts?cat=Legends"
            onClick={() => categoryChange("Legends")}
            className="px-4 py-2 bg-gray-100 text-gray-700 border rounded-full  hover:bg-gray-200 transition-colors duration-200 font-medium"
          >
            Legends
          </Link>
          <Link
            to="/posts?cat=Matches"
            onClick={() => categoryChange("Matches")}
            className="px-4 py-2 bg-gray-100 text-gray-700  border rounded-full  hover:bg-gray-200 transition-colors duration-200 font-medium"
          >
            Matches
          </Link>
          <Link
            to="/posts?cat=Leagues"
            onClick={() => categoryChange("Leagues")}
            className="px-4 py-2 bg-gray-100 text-gray-700 border rounded-full  hover:bg-gray-200 transition-colors duration-200 font-medium"
          >
            Leagues
          </Link>
          <Link
            to="/posts?cat=Youngstars"
            onClick={() => categoryChange("Youngstars")}
            className="px-4 py-2 bg-gray-100 text-gray-700 border rounded-full  hover:bg-gray-200 transition-colors duration-200 font-medium"
          >
            Young Stars
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
