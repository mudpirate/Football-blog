import React from "react";
import Comment from "./comment";

const Comments = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-2xl w-full">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">
        Comments
      </h2>

      <form className="mb-10">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Share your thoughts
          </label>
          <textarea
            placeholder="Write your comment here..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-800 bg-gray-50 min-h-[44px] h-32 transition-all duration-200 resize-none"
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Press Enter to submit, Shift+Enter for new line
          </p>
          <button
            type="submit"
            className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Post Comment
          </button>
        </div>
      </form>

      <div className="space-y-6">
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
    </div>
  );
};

export default Comments;
