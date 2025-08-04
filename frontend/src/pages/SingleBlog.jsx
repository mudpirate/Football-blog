import React from "react";
import Image1 from "../components/Image";
import PostMenuAction from "../components/PostMenuAction";
import { Link, useParams } from "react-router-dom";
import Search from "../components/Search";
import Comments from "../components/Comments";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "timeago.js";
import { useUser } from "@clerk/clerk-react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { Toaster } from "react-hot-toast";
import Bookmarks from "../components/Bookmarks";

const SingleBlog = () => {
  const { slug } = useParams();

  const { user } = useUser();
  const {
    data: recentPostsData,
    isLoading: loadingRecent,
    isError: errorRecent,
  } = useQuery({
    queryKey: ["recent-posts"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
      return res.data;
    },
  });

  const recentPosts = recentPostsData?.posts
    ?.filter((post) => post.slug !== slug)
    ?.slice(0, 4); // Limit to 3 recent posts

  const fetchBlog = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/${slug}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", slug],
    queryFn: fetchBlog,
  });

  if (isLoading)
    return (
      <p className="text-center py-20 text-lg text-gray-500">Loading...</p>
    );
  if (isError)
    return (
      <p className="text-center py-20 text-lg text-red-500">
        Error loading post
      </p>
    );

  return (
    <div className="min-h-screen p-1">
      <Toaster position="top-center" />
      <div className="max-w-screen  flex justify-center  items-center sm:px-4 lg:px-8 py-6">
        <div className="flex flex-col w-full  px-1 lg:flex-row gap-5">
          {/* Main Content */}
          <div className="flex-1 bg-white dark:bg-black md:border-1  w-full sm:w-full ">
            <div className=" dark:text-white px-2 py-2  dark:bg-black  shadow-xl sm:p-6 lg:p-10">
              <PostMenuAction post={data} />
              {data?.img && (
                <div className="flex justify-center mb-6">
                  <div className="w-full max-h-[90vh] overflow-hidden  shadow-lg">
                    <Image1
                      src={data.img}
                      className="w-full h-full object-cover object-center transition-transform duration-300 "
                    />
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-center gap-3 text-gray-500 text-sm mb-2">
                  <span className="inline-flex items-center gap-1">
                    {data?.user?.img && (
                      <Image1
                        className="w-7 h-7 rounded-full dark:text-white dark:bg-black  object-cover border border-gray-200"
                        src={data?.user?.img}
                      />
                    )}

                    <span className="font-semibold dark:text-white dark:bg-black  text-black capitalize px-3 py-1 rounded-full text-xs bg-gray-200">
                      {data?.user?.username || "unknown"}
                    </span>
                  </span>

                  <span className=" text-black capitalize dark:text-white dark:bg-black  bg-gray-200 px-3 py-1 text-xs rounded-xl">
                    {data?.category}
                  </span>

                  <span className=" text-black  dark:text-white dark:bg-black  bg-gray-200 px-3 py-1 text-xs rounded-xl">
                    {format(data?.createdAt)}
                  </span>
                </div>
                <h1 className="text-4xl dark:text-white dark:bg-black  font-extrabold text-gray-900 leading-tight mb-2">
                  {data?.title}
                </h1>

                {data?.desc && (
                  <p className="text-lg text-gray-500 font-bold pl-1 ">
                    {data?.desc}
                  </p>
                )}
                <div className="prose prose-lg max-w-none mt-2 text-justify text-gray-900">
                  <div
                    className="blog-content dark:text-white dark:bg-black "
                    dangerouslySetInnerHTML={{ __html: data?.content }}
                  />
                </div>
              </div>
              {/* Divider */}
              <div className="my-10 border-t border-gray-200" />
              {/* Comments Section */}
              <div className="mt-8 ">
                <h2 className="text-2xl font-bold dark:text-white dark:bg-black  text-gray-800 mb-4">
                  Comments
                </h2>
                <Comments postId={data?._id} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0 space-y-8">
            {/* Search */}

            <div className="bg-white border  dark:text-white w-full sm:w-full dark:bg-black p-4 shadow-md">
              <Bookmarks />
            </div>

            {recentPosts && (
              <div className="bg-white border w-full sm:w-full dark:text-white dark:bg-black p-2 sm:p-6 shadow-md">
                <h3 className="text-lg underline dark:text-white dark:bg-black  font-bold text-gray-900 mb-4">
                  Recent Posts
                </h3>
                <div className="space-y-4 dark:text-white  dark:bg-black ">
                  {recentPosts.map((post) => (
                    <Link
                      to={`/posts/${post.slug}`}
                      key={post._id}
                      className="block group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 flex-shrink-0 overflow-hidden ">
                          <Image1
                            src={post.img}
                            className="object-cover w-full h-16"
                          />
                        </div>
                        <div>
                          <p className="text-sm dark:text-white dark:bg-black  text-gray-700 font-semibold line-clamp-2 transition">
                            {post.title}
                          </p>
                          <span className="text-xs text-gray-500">
                            {format(post.createdAt)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Author Info */}
            <div className="bg-white w-full sm:w-full border dark:text-white dark:bg-black  p-6 shadow-md flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-3 overflow-hidden">
                {(data?.user?.img && (
                  <Image1
                    className="w-full h-full object-cover rounded-full"
                    src={data?.user?.img}
                  />
                )) ||
                  "Unknown"}
              </div>
              <p className="font-bold  dark:text-white dark:bg-black text-lg capitalize text-gray-900">
                {data?.user?.username}
              </p>
              <p className="text-sm text-gray-500 mb-2">Football Analyst</p>
              <p className="text-xs text-gray-400">
                Passionate about football, sharing insights and stories.
              </p>
            </div>

            {/* Categories */}

            {/* you may like */}

            {/* Social Share */}
            <div className="fixed left-1 top-1/2 dark:text-white dark:bg-black    px-6 py-4 rounded-xl  w-10 flex flex-col items-center gap-4">
              <button
                className="bg-black text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition duration-200"
                aria-label="Share on Facebook"
              >
                <FaFacebook size={20} />
              </button>

              <button
                className="bg-black text-white p-2 rounded-full cursor-pointer hover:bg-gray-800 transition duration-200"
                aria-label="Share on Twitter"
              >
                <FaSquareXTwitter size={20} />
              </button>

              <button
                className="bg-black text-white p-2 rounded-full cursor-pointer hover:bg-green-600 transition duration-200"
                aria-label="Share on WhatsApp"
              >
                <IoLogoWhatsapp size={20} />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
