import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogList from "./pages/BlogList";
import SingleBlog from "./pages/SingleBlog";
import Write from "./pages/Write";
import HomePage from "./pages/HomePage";
import Layout from "./layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "./pages/About";
import BookmarkPage from "./pages/BookmarkPage";

function App() {
  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Routes>
        {/* Wrap all main pages with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/posts" element={<BlogList />} />
          <Route path="/posts/:slug" element={<SingleBlog />} />
          <Route path="/post-blog" element={<Write />} />
          <Route path="/about" element={<About />} />
          <Route path="/bookmarks" element={<BookmarkPage />} />
        </Route>

        {/* Auth pages outside Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/sign-in" element={<Navigate to="/login" replace />} />
        <Route path="/sign-up" element={<Navigate to="/register" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
