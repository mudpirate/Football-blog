import React from "react";
import Image1 from "../components/Image";
import PostMenuAction from "../components/PostMenuAction";
import { Link, useParams } from "react-router-dom";
import Search from "../components/Search";
import Comments from "../components/comments";

const SingleBlog = () => {
  const { slug } = useParams();

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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading posts</p>;

  return (
    <div className="min-h-screen bg-white">
      <PostMenuAction />
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <div>
                  <Image1
                    src="/tom.png"
                    className="w-full h-96 object-cover rounded-xl"
                  />
                </div>
                <div className="flex flex-col gap-3 mt-6">
                  <h1 className="text-3xl font-bold text-gray-900">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    At, omnis?
                  </h1>
                  <p className="text-gray-600">
                    Written by john doe on Players 2 days ago
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod cupiditate ut exercitationem eos provident obcaecati.
                    Fugiat ipsum nihil architecto quia, quidem sint quam
                    excepturi dolores sunt laboriosam, laborum similique veniam!
                  </p>
                </div>
                <div className="flex flex-col text-justify mt-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Ipsam perferendis ad, quaerat delectus dolor fugiat nihil
                    veritatis, provident sint illum sunt placeat illo nostrum
                    doloribus totam numquam adipisci vero dolorum ea. Minus
                    numquam sit, deleniti aspernatur accusantium ratione
                    voluptates blanditiis nulla vero magnam dicta nihil?
                    Nesciunt vitae reprehenderit culpa debitis, sequi commodi
                    tenetur necessitatibus sunt a, doloremque in voluptates
                    corrupti.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Esse dicta modi doloremque nobis omnis perferendis commodi
                    doloribus unde sint explicabo voluptatum excepturi ipsam,
                    iste molestias, suscipit accusamus at dolorem nostrum quis
                    quo itaque? Possimus excepturi ipsa iure ut laborum,
                    mollitia id atque! Porro quae sit nemo repudiandae dolores,
                    impedit amet.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam voluptates, quod, quia, voluptate quae voluptatem
                    quibusdam voluptatibus quos quas nesciunt nemo. Quisquam,
                    quae. Quisquam voluptates, quod, quia, voluptate quae
                    voluptatem quibusdam voluptatibus quos quas nesciunt nemo.
                    Quisquam, quae.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam voluptates, quod, quia, voluptate quae voluptatem
                    quibusdam voluptatibus quos quas nesciunt nemo. Quisquam,
                    quae. Quisquam voluptates, quod, quia, voluptate quae
                    voluptatem quibusdam voluptatibus quos quas nesciunt nemo.
                    Quisquam, quae.
                  </p>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-8">
                <Comments />
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Search */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <Search />
              </div>

              {/* Author Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  About the Author
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-semibold text-lg">
                      JD
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">John Doe</p>
                    <p className="text-sm text-gray-500">Football Analyst</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  Experienced football analyst with over 10 years covering the
                  beautiful game. Specializes in tactical analysis and player
                  development.
                </p>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  <Link className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200 font-medium">
                    All blogs
                  </Link>
                  <Link className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200 font-medium">
                    Players
                  </Link>
                  <Link className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200 font-medium">
                    Legends
                  </Link>
                  <Link className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200 font-medium">
                    Matches
                  </Link>
                  <Link className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200 font-medium">
                    Leagues
                  </Link>
                  <Link className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200 font-medium">
                    Transfers
                  </Link>
                  <Link className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200 font-medium">
                    Young stars
                  </Link>
                </div>
              </div>

              {/* Social Share */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Share This Article
                </h3>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm">
                    Facebook
                  </button>
                  <button className="flex-1 bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500 transition-colors duration-200 text-sm">
                    Twitter
                  </button>
                  <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm">
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
