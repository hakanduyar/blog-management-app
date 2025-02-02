import React, { useState } from "react";
import BlogList from "./components/BlogList/BlogList.jsx";
import AddNewBlog from "./components/BlogList/AddNewBlog.jsx";
import { blogData } from "./data/blogData.js";

const App = () => {
  const [blogs, setBlogs] = useState(blogData);

  const addBlog = (newBlog) => {
    setBlogs([
      ...blogs,
      {
        ...newBlog,
        id: blogs.length + 1,
        comments: [],
        imageUrl: "https://picsum.photos/200/300?random=1",
      },
    ]);
  };

  const updateBlog = (id, updatedBlog) => {
    setBlogs(
      blogs.map((blog) => (blog.id === id ? { ...blog, ...updatedBlog } : blog))
    );
  };

  return (
    <div className="App">
      <AddNewBlog addBlog={addBlog} />
      <BlogList blogs={blogs} setBlogs={setBlogs} onUpdate={updateBlog} />
    </div>
  );
};

export default App;
