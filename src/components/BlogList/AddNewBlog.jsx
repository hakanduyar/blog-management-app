import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AddNewBlog.css";

const AddNewBlog = ({ addBlog }) => {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    date: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((field) => !field.trim()))
      return alert("Tüm alanlar doldurulmalıdır.");
    addBlog(formData);
    setFormData({ title: "", content: "", author: "", date: "" });
    setFormVisible(false);
  };

  return (
    <div className="add-new-blog">
      <div
        className="add-new-blog-icon"
        onClick={() => setFormVisible(!formVisible)}
      >
        <i className="fas fa-plus"></i>
      </div>
      {formVisible && (
        <form onSubmit={handleSubmit}>
          {["title", "content", "author", "date"].map((field, index) => (
            <div className="form-group" key={index}>
              <label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field !== "content" ? (
                <input
                  type={field === "date" ? "date" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder={`${
                    field.charAt(0).toUpperCase() + field.slice(1)
                  } girin`}
                />
              ) : (
                <textarea
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder={`${
                    field.charAt(0).toUpperCase() + field.slice(1)
                  } girin`}
                />
              )}
            </div>
          ))}
          <button type="submit" className="btn btn-primary">
            Ekle
          </button>
        </form>
      )}
    </div>
  );
};

AddNewBlog.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default AddNewBlog;
