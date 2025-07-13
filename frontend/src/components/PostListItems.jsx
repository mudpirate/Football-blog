import React from "react";
import Image1 from "./Image.jsx";

const PostListItems = () => {
  const posts = [
    {
      id: 1,
      image: "/viniJr.jpg",
      title: "The Evolution of Modern Football Tactics",
      author: "John Doe",
      category: "Players",
      date: "2 days ago",
      description:
        "Exploring how modern football has evolved with new tactical approaches and the impact on player development and team strategies.",
    },
    {
      id: 2,
      image: "/viniJr.jpg",
      title: "Champions League: A Season of Surprises",
      author: "John Doe",
      category: "Matches",
      date: "1 day ago",
      description:
        "This season's Champions League has been full of unexpected results and thrilling matches that have kept fans on the edge of their seats.",
    },
    {
      id: 3,
      image: "/viniJr.jpg",
      title: "Transfer Market Analysis: Summer 2024",
      author: "John Doe",
      category: "Transfers",
      date: "3 days ago",
      description:
        "A comprehensive look at the biggest transfers this summer and how they're reshaping the landscape of European football.",
    },
    {
      id: 4,
      image: "/viniJr.jpg",
      title: "Young Stars to Watch This Season",
      author: "John Doe",
      category: "Young Stars",
      date: "4 days ago",
      description:
        "Meet the rising talents who are making waves in football and could become the next generation of superstars.",
    },
    {
      id: 5,
      image: "/viniJr.jpg",
      title: "Premier League Title Race Heats Up",
      author: "John Doe",
      category: "League",
      date: "5 days ago",
      description:
        "As the season progresses, the race for the Premier League title is becoming more intense with multiple teams in contention.",
    },
    {
      id: 6,
      image: "/viniJr.jpg",
      title: "The Art of Defending in Modern Football",
      author: "John Doe",
      category: "Players",
      date: "1 week ago",
      description:
        "How defensive strategies have evolved and the skills required to be a top defender in today's fast-paced game.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white flex rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="flex-shrink-0 w-48 h-48">
              <Image1
                src={post.image}
                w=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-gray-300 px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm">{post.date}</span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-xs font-medium">
                      JD
                    </span>
                  </div>
                  <span className="text-sm text-gray-700 font-medium">
                    {post.author}
                  </span>
                </div>

                <button className="bg-black hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                  Read More
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PostListItems;
