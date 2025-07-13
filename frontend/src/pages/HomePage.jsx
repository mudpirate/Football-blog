import React from "react";

import Hero from "../components/Hero";
import Categories from "../components/Categories";
import PostList from "../components/PostList";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <div className="flex  flex-col">
        <Categories />
        <PostList />
      </div>
    </div>
  );
};

export default HomePage;
