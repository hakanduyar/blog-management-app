import React, { useState } from "react";
import PropTypes from "prop-types";
import "./BlogItem.css";
import "bootstrap/dist/css/bootstrap.min.css";

const BlogItem = ({
  id,
  author,
  title,
  content,
  date,
  comments,
  imageUrl,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title, author, content, date });

  const handleEditClick = () => setIsEditing(true);
  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleUpdate = () => {
    onUpdate(id, formData);
    setIsEditing(false);
  };

  return (
    <div className="blog-item card mb-4">
      <div className="row g-0">
        <div className="col-md-8">
          <div className="card-body">
            {isEditing ? (
              <form>
                {["title", "content", "author", "date"].map((field, index) => (
                  <div className="form-group" key={index}>
                    <label htmlFor={field}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    {field === "content" ? (
                      <textarea
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        required
                      />
                    ) : (
                      <input
                        type={field === "date" ? "date" : "text"}
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        required
                      />
                    )}
                  </div>
                ))}
                <button type="button" onClick={handleUpdate}>
                  Güncelle
                </button>
              </form>
            ) : (
              <>
                <div className="header d-flex align-items-center mb-3">
                  <div className="icon me-2">
                    <h4 className="rounded-circle bg-secondary p-2">
                      <i className="fas fa-user"></i>
                    </h4>
                  </div>
                  <div className="author">
                    <h4 className="mb-0">{author}</h4>
                  </div>
                </div>
                <div className="body">
                  <div className="title">
                    <h2 className="card-title">{title}</h2>
                  </div>
                  <div className="content">
                    <p className="card-text">{content}</p>
                  </div>
                </div>
                <div className="alt d-flex justify-content-between align-items-center mt-3">
                  <div className="date text-muted">
                    <h4 className="mb-0">{date}</h4>
                  </div>
                  <div className="comments-amount">
                    <h4 className="mb-0">{comments.length} yorum</h4>
                  </div>
                  <div className="actions">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => onDelete(id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={handleEditClick}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-md-4">
          <img
            src={imageUrl}
            className="img-fluid rounded-end"
            alt="Blog visual"
          />
        </div>
      </div>
    </div>
  );
};

BlogItem.propTypes = {
  id: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BlogItem;
