import { Link } from "react-router-dom";
import Image from "./Image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";

const fetchPost = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=3`
  );
  return res.data;
};

const FeaturedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["Featuredposts"],
    queryFn: fetchPost,
  });

  if (isPending) {
    return <p className="text-center py-10 text-gray-500">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-center py-10 text-red-500">
        Something went wrong! {error.message}
      </p>
    );
  }

  const posts = data?.posts;
  if (!posts || posts.length === 0) return null;

  return (
    <div className="w-full  max-w-4xl mx-auto mt-1 px-2 sm:px-4 lg:px-6 h-[91vh] overflow-y-auto">
      <div className="flex flex-col  gap-2 sm:gap-3 lg:gap-4">
        {posts.slice(0, 3).map((post, index) => (
          <div
            key={post._id}
            className="bg-white dark:text-white dark:bg-black hover:scale-[1.01] shadow hover:shadow-md transition duration-300 overflow-hidden flex flex-col sm:flex-row rounded-lg sm:rounded-none"
          >
            {/* Image Section */}
            {post.img && (
              <Link
                to={`/posts/${post.slug}`}
                className=" w-[90vw] h-70 mt-4 md:w-[12vw]  sm:h-32 md:h-36 lg:h-40 xl:h-44 flex-shrink-0"
              >
                <Image
                  src={post.img}
                  className="w-[90vw] rounded-xl md:w-full h-70 md:h-60 object-cover"
                />
              </Link>
            )}

            {/* Content Section */}
            <div className="px-3 mt-3  sm:px-4 lg:px-6 py-3 sm:py-4 flex-1 flex flex-col justify-between min-h-0">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 mb-2">
                  <Link
                    to={`/category/${post.category}`}
                    className="px-2 sm:px-3 py-1 rounded-full text-xs bg-gray-200 dark:text-black font-semibold capitalize inline-block w-fit"
                  >
                    {post.category}
                  </Link>
                  <span className="text-xs sm:text-sm">
                    {format(post.createdAt)}
                  </span>
                </div>

                <Link to={`/posts/${post.slug}`}>
                  <h3 className="text-base sm:text-lg lg:text-xl dark:text-white dark:bg-black font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-gray-800 dark:hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm lg:text-base line-clamp-2 sm:line-clamp-3 mb-3">
                  {post.desc.length > 80
                    ? `${post.desc.slice(0, 80)}...`
                    : post.desc}
                </p>
              </div>
              <div className="flex justify-between items-center">
                {" "}
                <div className="text-xs sm:text-sm dark:text-white dark:bg-black text-gray-700 mt-2">
                  Written By{" "}
                  <span className="font-bold text-black dark:text-white dark:bg-black capitalize">
                    {post.user?.username || "Admin"}
                  </span>
                </div>
                <div className="">
                  <button className="bg-black text-white px-2 py-1 mt-2 rounded-md text-sm font-medium hover:scale-105 transition">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;
