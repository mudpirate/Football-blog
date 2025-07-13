import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // correct stylesheet

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState();
  if (!isLoaded) {
    return <div> Loading....</div>;
  }
  if (isLoaded && !isSignedIn) {
    return <div> Please login </div>;
  }
  return (
    <div className="flex ml-9 justify-center items-center min-h-screen py-10">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-2xl border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Create New Blog
        </h1>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image
            </label>
            <button
              type="button"
              className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 mb-2"
            >
              Add a cover image
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categories
            </label>
            <select
              name="cat"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 bg-gray-50"
            >
              <option value="general">General</option>
              <option value="legends">Legends</option>
              <option value="matches">Matches</option>
              <option value="leagues">Leagues</option>
              <option value="youngStars">Young Stars</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="desc"
              placeholder="Enter details"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 bg-gray-50 min-h-[80px] resize-y"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                className="h-100"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Generate With AI
            </button>
            <button
              type="submit"
              className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Write;
