import React, { useState } from "react";
import PostList from "../components/PostList";
import Sidebar from "../components/Sidebar";

const BlogList = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-2">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Players Blogs
        </h1>
        <div className="flex justify-end mb-4 md:hidden">
          <button
            className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 shadow-sm"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? "Close" : "Filters"}
          </button>
        </div>
        <div className="flex gap-8 flex-col-reverse md:flex-row">
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <PostList />
            </div>
          </div>
          <div className={`${open ? "block" : "hidden"} md:block md:w-80`}>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 md:mb-0">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
