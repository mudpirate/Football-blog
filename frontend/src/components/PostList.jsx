import React from "react";
import PostListItems from "./PostListItems";

const PostList = () => {
  return (
    <>
      <div className="flex gap-12 mb-8 w-full flex-col">
        <PostListItems />
        <PostListItems />
        <PostListItems />
        <PostListItems />
        <PostListItems />
        <PostListItems />
        <PostListItems />
        <PostListItems />
        <PostListItems />
      </div>
    </>
  );
};

export default PostList;
