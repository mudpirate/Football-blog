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
    return (
      <div>
        <button
          disabled
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            role="status"
            class="inline w-4 h-4 me-3 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Loading...
        </button>
        <button
          disabled
          type="button"
          class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            role="status"
            class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"
            />
          </svg>
          Loading...
        </button>
      </div>
    );
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
    <div className="w-full   max-w-4xl  mx-auto mt-2 px-1 sm:px-4 lg:px-6 h-[91vh] overflow-y-auto overflow-x-hidden">
      <div className="flex flex-col  gap-2 sm:gap-3 lg:gap-4">
        {posts.slice(0, 3).map((post, index) => (
          <div
            key={post._id}
            className="  dark:text-white border dark:bg-black hover:scale-[1.01] shadow hover:shadow-md transition duration-300 overflow-hidden flex flex-col sm:flex-row  sm:rounded-none"
          >
            {/* Image Section */}
            {post.img && (
              <Link
                to={`/posts/${post.slug}`}
                className=" w-[95vw] h-70  md:w-[15vw]  sm:h-32 md:h-75 lg:h-40 xl:h-44 flex-shrink-0"
              >
                <Image
                  src={post.img}
                  className="w-[95vw]  md:w-full h-70 md:h-75 object-cover"
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
