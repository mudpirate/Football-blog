import React from "react";
import Image1 from "../components/Image.jsx";
import { Link, Links } from "react-router-dom";

const Featured = () => {
  return (
    <>
      <div className="flex flex-col h-[80vh] gap-1">
        <div className="flex gap-4 p-4 bg-white rounded shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex-shrink-0">
            <Image1
              src="/viniJr.jpg"
              className="h-24 w-32 rounded-xl object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex gap-2 mb-2">
              <Link className="bg-gray-200 text-black rounded px-3 py-1 text-xs font-semibold">
                Legends
              </Link>
              <span className="bg-gray-100 text-gray-600 rounded px-3 py-1 text-xs">
                2 days ago
              </span>
            </div>
            <Link
              to="/posts/test"
              className="text-lg font-bold text-gray-900 mb-2 line-clamp-2"
            >
              Vinicius Jr: The Rising Star of Real Madrid
            </Link>
            <p>Lorem, ipsum dolor sit amet consectetur a</p>
          </div>
        </div>

        <div className="flex gap-4 p-4 bg-white rounded shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex-shrink-0">
            <Image1
              src="/messi.jpg"
              className="h-24 w-32 rounded-xl object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex gap-2 mb-2">
              <span className="bg-gray-200 text-black rounded-full px-3 py-1 text-xs font-semibold">
                Matches
              </span>
              <span className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs">
                1 day ago
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
              Champions League Final: Real Madrid vs Manchester City
            </h3>
            <p>Lorem, ipsum dolor sit amet consectetur adip</p>
          </div>
        </div>

        <div className="flex gap-4 p-4 bg-white  shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex-shrink-0">
            <Image1
              src="/Neymar Jr 2022.jpg"
              className="h-24 w-32 rounded-xl object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex gap-2 mb-2">
              <span className="bg-gray-200 text-black rounded-full px-3 py-1 text-xs font-semibold">
                Transfers
              </span>
              <span className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs">
                3 days ago
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
              Summer Transfer Window: Biggest Deals So Far
            </h3>
            <p>Lorem, ipsum dolor sit amet consectetur adipisi</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;
