import React, { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload";

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState("");
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    img && setValue((prev) => prev + `<p><image src="${img.url}"/></p>`);
  }, [img]);

  useEffect(() => {
    video &&
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`
      );
  }, [video]);

  const navigate = useNavigate();

  const { getToken } = useAuth();

  // ✅ Mutation to create a post
  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      toast.success("post has been created");
      navigate(`/posts/${res.data.slug}`);
    },
    onError: () => {
      alert("❌ Failed to publish post.");
    },
  });

  // ✅ Auth checks
  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Please log in to create a post.</div>;

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);

    const data = {
      img: cover.filePath || "",
      title: formdata.get("title"),
      category: formdata.get("category"),
      desc: formdata.get("desc"),
      content: value,
    };

    if (!data.title || !data.content) {
      return alert("Title and content are required");
    }

    mutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-10 px-2">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Create New Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* --- Cover Image Placeholder --- */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image
            </label>
            <Upload type="image" setProgress={setProgress} setData={setCover}>
              <button
                type="button"
                className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 transition"
              >
                Add a cover image
              </button>
            </Upload>

            {progress > 0 && progress < 100 && (
              <div className="mt-2 text-xs text-blue-600">
                Uploading: {progress}%
              </div>
            )}

            {cover?.url && (
              <div className="mt-4">
                <img
                  src={cover.url}
                  alt="Cover preview"
                  className="w-full max-h-64 object-cover rounded-lg shadow border"
                />
              </div>
            )}
          </div>

          {/* --- Title --- */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 bg-gray-50"
              required
            />
          </div>

          {/* --- Category --- */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categories
            </label>
            <select
              name="category"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 bg-gray-50"
            >
              <option value="general">General</option>
              <option value="legends">Legends</option>
              <option value="matches">Matches</option>
              <option value="leagues">Leagues</option>
              <option value="youngStars">Young Stars</option>
            </select>
          </div>

          {/* --- Description --- */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="desc"
              placeholder="Enter description"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 bg-gray-50 resize-y"
            />
          </div>

          {/* --- Content Editor & Media --- */}

          <div className="flex  gap-2 w-full md:mr-2">
            <Upload type="image" setProgress={setProgress} setData={setImg}>
              <button type="button" className="bg-black p-2 text-white">
                Add image
              </button>
            </Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              <button type="button" className="bg-black p-2 text-white">
                Add video
              </button>
            </Upload>
          </div>

          <ReactQuill
            theme="snow"
            className="rounded-xl bg-white shadow-md "
            value={value}
            onChange={setValue}
            readOnly={0 < progress && progress < 100}
          />

          {/* --- Buttons --- */}
          <div className="flex gap-4 justify-end items-center mt-6">
            <button
              type="button"
              className="bg-gray-700 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-800 transition"
            >
              Generate With AI
            </button>
            <button
              type="submit"
              className="bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-900 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={mutation.isPending || (0 < progress && progress < 100)}
            >
              {mutation.isPending ? "Publishing..." : "Publish Post"}
            </button>
            {mutation.error && (
              <span className="text-red-600"> {mutation.error.message}</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Write;
