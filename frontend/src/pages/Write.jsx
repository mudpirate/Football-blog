import React, { useEffect, useState, useRef } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";

import Upload from "../components/Upload";
import { marked } from "marked";
import "../index.css";

const Write = () => {
  const formRef = useRef(null);
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [value, setValue] = useState(""); // Quill content
  const [loading, setLoading] = useState(false);
  const [cover, setCover] = useState(""); // Cover image data
  const [img, setImg] = useState(""); // Inline image
  const [video, setVideo] = useState(""); // Inline video
  const [progress, setProgress] = useState(0); // Upload progress

  // Insert uploaded image into editor
  useEffect(() => {
    if (img?.url) {
      setValue(
        (prev) =>
          prev +
          `<p><img src="${img.url}" style="max-width: 100%; height: auto; border-radius: 12px; margin: 12px 0;" /></p>`
      );
    }
  }, [img]);

  // Insert uploaded video into editor
  useEffect(() => {
    if (video?.url) {
      setValue(
        (prev) =>
          prev +
          `<p><iframe class="ql-video" src="${video.url}" frameborder="0" allowfullscreen></iframe></p>`
      );
    }
  }, [video]);

  // Mutation to create blog post
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
      toast.success("✅ Post created!");
      navigate(`/posts/${res.data.slug}`);
    },
    onError: (err) => {
      toast.error("❌ Failed to publish post.");
      console.error(err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);

    const data = {
      img: cover.url || "",
      title: formdata.get("title"),
      category: formdata.get("category"),
      desc: formdata.get("desc"),
      content: value,
      filePath: cover.filePath || "", // optional
    };

    if (!data.title || !data.content) {
      return toast.error("Title and content are required.");
    }

    mutation.mutate(data);
  };
  const generateAI = async () => {
    try {
      if (!formRef.current) return;

      setLoading(true); // 🟢 Start loading

      const formdata = new FormData(formRef.current);
      const send = {
        title: formdata.get("title"),
      };
      if (!send.title && !send.desc) {
        return toast.error("Title is required.");
      }

      const prompt = `You are a blog content genertor AI agent, write a blog post with proper use of headings, bold text, and spaced paragraphs on the topic: ${send.title}`;

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/AI`,
        { prompt }
      );

      if (data?.response) {
        const html = marked.parse(data.response);
        const cleanHtml = DOMPurify.sanitize(html);
        setValue((prev) => prev + cleanHtml);
        toast.success("🧠 AI content generated!");
      } else {
        toast.error("No content returned by AI.");
      }
    } catch (err) {
      console.error("AI generation error:", err);
      toast.error("Failed to generate AI content.");
    } finally {
      setLoading(false); // 🔴 End loading
    }
  };

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Please sign in to create a post.</div>;

  return (
    <div className="flex  dark:text-white dark:bg-black  justify-center items-center min-h-screen bg-gray-100 py-10 px-2">
      <div className="bg-white dark:text-white dark:bg-black  rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl dark:text-white dark:bg-black  font-bold text-center  text-gray-900 mb-8">
          Create New Blog
        </h1>

        <form onSubmit={handleSubmit} ref={formRef} className="space-y-8">
          {/* --- Cover Image Upload --- */}
          <div>
            <Upload type="image" setProgress={setProgress} setData={setCover}>
              <button
                type="button"
                className="bg-black text-white px-4 py-2 rounded"
              >
                Upload Cover Image
              </button>
            </Upload>

            {progress > 0 && progress < 100 && (
              <p className="mt-2 text-sm text-blue-600">
                Uploading: {progress}%
              </p>
            )}

            {cover?.url && (
              <div className="mt-4">
                <img
                  src={cover.url}
                  alt="Cover Preview"
                  className="w-full max-h-64 object-cover rounded-lg border shadow"
                />
              </div>
            )}
          </div>

          {/* --- Title --- */}
          <div>
            <label className="block dark:text-white dark:bg-black  text-sm font-medium text-gray-700 mb-2">
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
            <label className="block text-sm dark:text-white dark:bg-black  font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 bg-gray-50"
            >
              <option value="General">General</option>
              <option value="Players">Players</option>
              <option value="Legends">Legends</option>
              <option value="Matches">Matches</option>
              <option value="Leagues">Leagues</option>
              <option value="Transfers">Transfers</option>
              <option value="Youngstars">YoungStars</option>
            </select>
          </div>

          {/* --- Description --- */}
          <div>
            <label className="block text-sm dark:text-white dark:bg-black  font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="desc"
              placeholder="Short description"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 bg-gray-50 resize-y"
            />
          </div>

          {/* --- Media Buttons --- */}
          <div className="flex gap-2">
            <Upload type="image" setProgress={setProgress} setData={setImg}>
              <button
                type="button"
                className="bg-gray-800 text-white px-4 py-2 rounded"
              >
                Add Image
              </button>
            </Upload>

            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              <button
                type="button"
                className="bg-gray-800 text-white px-4 py-2 rounded"
              >
                Add Video
              </button>
            </Upload>
          </div>

          {/* --- Quill Editor --- */}

          <ReactQuill
            theme="snow"
            className="bg-white shadow rounded-lg"
            value={value}
            onChange={setValue}
            readOnly={progress > 0 && progress < 100}
          />

          {/* --- Buttons --- */}
          <div className="flex justify-end gap-4">
            <button
              onClick={(e) => generateAI(e)}
              type="button"
              className="bg-black text-white px-6 py-2 rounded-xl hover:bg-black"
            >
              {loading ? "Generating..." : "Generate With AI"}
            </button>

            <button
              type="submit"
              className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-900 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={mutation.isPending || (progress > 0 && progress < 100)}
            >
              {mutation.isPending ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Write;
