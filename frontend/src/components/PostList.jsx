import React from "react";
import PostListItems from "./PostListItems";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const PostList = () => {
  const fetchPosts = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
    return data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading posts</p>;

  return (
    <div className="flex gap-12 mb-8 w-full flex-col">
      {data.map((post) => (
        <PostListItems key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
