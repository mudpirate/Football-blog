import { Link } from "react-router-dom";
import Image from "./Image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";

const fetchPost = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true`
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
    <div className="max-w-6xl mx-auto mt-1 px-1 h-[91vh] overflow-y-hidden ">
      <div className="flex flex-col gap-1  ">
        {posts.slice(0, 3).map((post, index) => (
          <div
            key={post._id}
            className="bg-white h-45 dark:text-white dark:bg-black  shadow hover:shadow-md transition duration-300 overflow-hidden flex flex-col sm:flex-row"
          >
            {/* Image Section */}
            {post.img && (
              <Link to={`/posts/${post.slug}`} className=" w-45 h-45  ">
                <Image src={post.img} className="w-45 h-45  object-cover" />
              </Link>
            )}

            {/* Content Section */}
            <div className="px-4 flex-1 flex flex-col mt-3  justify-between">
              <div>
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-1">
                  <Link
                    to={`/category/${post.category}`}
                    className=" text-black bg-gray-200 px-3 dark:text-white dark:bg-black py-1 text-xs capitalize rounded-xl"
                  >
                    {post.category}
                  </Link>
                  <span>{format(post.createdAt)}</span>
                </div>

                <Link to={`/posts/${post.slug}`}>
                  <h3 className="text-lg dark:text-white dark:bg-black font-semibold text-gray-900 mb-1 line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-gray-600 dark:text-gray-400   text-sm line-clamp-3">
                  {post.desc.slice(0, 49)}...
                </p>
              </div>

              <div className=" text-sm mb-3 dark:text-white dark:bg-black text-gray-700  ">
                Written By{" "}
                <span className="font-bold text-black dark:text-white dark:bg-black  capitalize">
                  {post.user?.username || "Unknown"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;
