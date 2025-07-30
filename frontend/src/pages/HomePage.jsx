import React from "react";

import Hero from "../components/Hero";
import Categories from "../components/Categories";
import PostList from "../components/PostList";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <div className="flex flex-col">
        <Categories />
        <div className="dark:bg-black ">
          <PostList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
