import React, { useState } from "react";
import PostList from "../components/PostList";
import Sidebar from "../components/Sidebar";
import { useSearchParams } from "react-router-dom";

const BlogList = () => {
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("cat");

  const getHeading = (cat) => {
    const headings = {
      players: "Players Blogs",
      matches: "Match Blogs",
      legends: "Legend Blogs",
      leagues: "League Blogs",
      youngstars: "Young Star Blogs",
      transfers: "Transfer Blogs",
    };
    return headings[cat?.toLowerCase()] || "All Blogs";
  };

  return (
    <div className="  dark:bg-black py-10 px-2">
      <div className="">
        {/* Page Title */}
        <h1 className="text-4xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
          {getHeading(category)}
        </h1>

        {/* Mobile Filter Toggle */}
        <div className="flex justify-center mb-6 md:hidden">
          <button
            className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition duration-200 shadow"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? "Close Filters" : "Show Filters"}
          </button>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col-reverse  md:flex-col-reverse gap-6">
          {/* Post List */}
          <div className="flex-1">
            <div className="dark:bg-black rounded-xl">
              <PostList />
            </div>
          </div>

          {/* Sidebar - Visible on md+ or toggle on mobile */}
          <div
            className={`${
              open ? "block" : "hidden"
            } md:block  bg-gray-100 md:w-full md:p-3 dark:bg-black shadow-lg p-6 rounded-xl`}
          >
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
