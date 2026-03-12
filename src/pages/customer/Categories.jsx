import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Categories.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [showCategories, setShowCategories] = useState(false);

  const API_BASE = "https://localhost:7196/Categories";

  // Fetch categories
  const fetchCategories = () => {
    axios
      .get(`${API_BASE}/GetallCategories`)
      .then((res) => {
        console.log("API Response:", res.data);
        setCategories(res.data); // ⚠️ if backend wraps data, change to res.data.$values
      })
      .catch((err) => console.error("Fetch Error:", err));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add / Update
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      categoryId: editingId || 0, // backend requires categoryId
      name: form.name,
      description: form.description,
    };

    axios
      .post(`${API_BASE}/addcategories`, payload)
      .then(() => {
        fetchCategories(); // refresh list
        setForm({ name: "", description: "" });
        setEditingId(null);
      })
      .catch((err) => console.error("Submit Error:", err));
  };

  // Edit
  const handleEdit = (category) => {
    setForm({ name: category.name, description: category.description });
    setEditingId(category.categoryId);
  };

  // Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      axios
        .delete(`${API_BASE}/DeleteCategories/${id}`)
        .then(() => {
          fetchCategories();
        })
        .catch((err) => console.error("Delete Error:", err));
    }
  };

  return (
     <div className="container">
      <h2 className="title">📂 Manage Categories</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Category Description"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit" className="button button-add">
          {editingId ? "✏️ Update Category" : "➕ Add Category"}
        </button>
      </form>

      {/* Toggle Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowCategories(true)}
          className="button button-toggle"
        >
          📜 Show All Categories
        </button>
      </div>

      {/* Popup Modal */}
      {showCategories && (
        <div className="modal-overlay">
          <div className="modal-content">

            <button className="modal-close" onClick={() => setShowCategories(false)}>
              ✖
            </button>

            <h2 className="modal-title">All Categories</h2>

            <div className="grid-container">
              {categories.length === 0 ? (
                <p className="no-categories">No categories found.</p>
              ) : (
                categories.map((cat) => (
                  <div key={cat.categoryId} className="card">
                    <div>
                      <h3>{cat.name}</h3>
                      <p>{cat.description}</p>
                    </div>

                    <div className="card-buttons">
                      <button
                        className="card-button-edit"
                        onClick={() => handleEdit(cat)}
                      >
                        ✏️ Edit
                      </button>

                      <button
                        className="card-button-delete"
                        onClick={() => handleDelete(cat.categoryId)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
