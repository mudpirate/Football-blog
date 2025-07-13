import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogList from "./pages/BlogList";
import SingleBlog from "./pages/SingleBlog";
import Write from "./pages/Write";
import HomePage from "./pages/HomePage";
import Layout from "./layout/Layout";

function App() {
  return (
    <Routes>
      {/* Wrap all main pages with Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/posts" element={<BlogList />} />
        <Route path="/posts/:slug" element={<SingleBlog />} />
        <Route path="/post-blog" element={<Write />} />
      </Route>

      {/* Auth pages outside Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
