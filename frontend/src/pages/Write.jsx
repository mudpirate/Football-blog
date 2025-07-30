import React, { useEffect, useState, useRef } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import { marked } from "marked";

import Upload from "../components/Upload";
import "../index.css";

const Write = () => {
  const formRef = useRef(null);
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const [descAI, setDescAI] = useState("");

  useEffect(() => {
    if (img?.url) {
      setValue(
        (prev) =>
          prev +
          `<p><img src="${img.url}" style="max-width: 100%; height: auto; border-radius: 12px; margin: 12px 0;" /></p>`
      );
    }
  }, [img]);

  useEffect(() => {
    if (video?.url) {
      setValue(
        (prev) =>
          prev +
          `<p><iframe class="ql-video" src="${video.url}" frameborder="0" allowfullscreen></iframe></p>`
      );
    }
  }, [video]);

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken({ template: "blog" }); // <-- use your template name here
      if (!token) throw new Error("No token found");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);

    const data = {
      img: cover.url || "",
      title: formdata.get("title"),
      category: formdata.get("category"),
      desc: formdata.get("desc"),
      content: value,
      filePath: cover.filePath || "",
    };

    if (!data.title || !data.content) {
      return toast.error("Title and content are required.");
    }

    mutation.mutate(data);
  };

  const generateDescAI = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading2(true);

    try {
      const formdata = new FormData(formRef.current);
      const title = formdata.get("title");

      if (!title) return toast.error("Title is required.");

      const prompt = `Write a **1-paragraph short description** about this topic: "${title}"`;

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/AI`,
        { prompt }
      );

      if (data?.response) {
        setDescAI(data.response.trim());
        toast.success("🧠 Description generated!");
      } else {
        toast.error("No description returned.");
      }
    } catch (err) {
      console.error(err);
      toast.error("AI failed to generate description.");
    } finally {
      setLoading2(false);
    }
  };

  const generateAI = async () => {
    try {
      if (!formRef.current) return;

      setLoading(true);
      const formdata = new FormData(formRef.current);
      const title = formdata.get("title");

      if (!title) {
        return toast.error("Title is required.");
      }

      const prompt = `You are a blog content generator AI agent. Write a detailed blog post about: "${title}"`;

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
      console.error(err);
      toast.error("Failed to generate AI content.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Please sign in to create a post.</div>;

  return (
    <div className="flex dark:text-white dark:bg-black justify-center items-center min-h-screen bg-gray-100 py-10 px-6">
      <div className="bg-white dark:bg-black w-full max-w-3xl rounded-xl shadow-lg p-7">
        <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">
          Create New Blog
        </h1>

        <form onSubmit={handleSubmit} ref={formRef} className="space-y-8">
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
              <img
                src={cover.url}
                alt="Cover"
                className="mt-4 w-full max-h-100 object-cover rounded-lg shadow"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-white">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 bg-gray-50 dark:text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-white">
              Category
            </label>
            <select
              name="category"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 bg-gray-50 dark:text-black"
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

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-white">
              Description
            </label>
            <textarea
              name="desc"
              placeholder="Short description"
              value={descAI}
              onChange={(e) => setDescAI(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg bg-gray-50 dark:text-black resize-y"
            />
            <button
              onClick={generateDescAI}
              className="bg-black mt-2 text-white px-3 py-2 rounded-xl"
              type="button"
            >
              {loading2 ? "Generating..." : "Generate Description With AI"}
            </button>
          </div>

          <div className="flex gap-2">
            <Upload type="image" setProgress={setProgress} setData={setImg}>
              <button
                type="button"
                className="bg-black text-white px-3 py-2 rounded-xl"
              >
                Add Image
              </button>
            </Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              <button
                type="button"
                className="bg-black text-white px-3 py-2 rounded-xl"
              >
                Add Video
              </button>
            </Upload>
          </div>

          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="bg-white shadow rounded-lg"
            readOnly={progress > 0 && progress < 100}
          />

          <div className="flex">
            <button
              onClick={generateAI}
              type="button"
              className="bg-black text-white px-3 py-2 rounded-xl mt-4"
            >
              {loading ? "Generating..." : "Generate Content With AI"}
            </button>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={mutation.isPending || (progress > 0 && progress < 100)}
              className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-900 disabled:bg-gray-400"
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
