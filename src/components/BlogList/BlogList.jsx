import React, { useState } from "react";
import PropTypes from "prop-types";
import BlogItem from "./BlogItem.jsx";
import { Helmet } from "react-helmet";

const BlogList = ({ blogs, setBlogs, onUpdate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");

  const handleDelete = (id) => setBlogs(blogs.filter((blog) => blog.id !== id));
  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());
  const handleSortChange = (e) => setSortType(e.target.value);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.author.toLowerCase().includes(searchTerm)
  );

  const sortedBlogs = filteredBlogs.sort((a, b) => {
    if (sortType === "date") return new Date(b.date) - new Date(a.date);
    if (sortType === "author") return a.author.localeCompare(b.author);
    return 0;
  });

  return (
    <div className="blog-list container mt-5">
      <Helmet>
        <title>Blog Listesi</title>
        <meta
          name="description"
          content="En son blog yazılarını okuyun ve fikirlerinizi paylaşın."
        />
      </Helmet>
      <div className="d-flex mb-3">
        <input
          type="text"
          placeholder="Ara..."
          className="form-control me-2"
          onChange={handleSearchChange}
        />
        <select className="form-select" onChange={handleSortChange}>
          <option value="">Sırala</option>
          <option value="date">Tarihe Göre</option>
          <option value="author">Yazara Göre</option>
        </select>
      </div>
      {sortedBlogs.map((blog) => (
        <BlogItem
          key={blog.id}
          {...blog}
          onDelete={handleDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BlogList;
