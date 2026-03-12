import React, { useState,useEffect } from "react";
import "./Profile.css";

import CartHeader from "../CartHeader"

export default function EditProfile({ profile, onSave, onCancel }) {
  // const [formData, setFormData] = useState({ ...profile });
 const [formData, setFormData] = useState({
    Name: profile?.Name || "",
  Email: profile?.Email || "",
  Phone: profile?.Phone || "",
  Address: profile?.Address || "",
  });

  // Update formData if the profile prop changes
  useEffect(() => {
    setFormData({
    Name: profile?.Name || "",
    Email: profile?.Email || "",
    Phone: profile?.Phone || "",
    Address: profile?.Address || "",
    });
  }, [profile]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    fetch("https://localhost:7196/Categories/AddOrUpdateProfile/AddOrUpdateProfile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        alert("Profile updated successfully!");
        onSave(formData);
      })
      .catch((err) => {
        console.error("Save error:", err);
        alert("Failed to save profile");
      });
  };

  return (
    <><CartHeader/>
    <div className="profile-page">
      <h2>Edit Profile</h2>
      <form className="profile-form" onSubmit={handleSave}>
        <input
          type="text"
          name="Name"
          value={formData.Name}
          placeholder=" Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Email"
          value={formData.Email}
          placeholder="Email"
          onChange={handleChange}
          required
          
        />
        <input
          type="text"
          name="Phone"
          value={formData.Phone}
          placeholder="Phone"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Address"
          value={formData.Address}
          placeholder="Address"
          onChange={handleChange}
          required
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="submit" className="save-btn">Save</button>
          <button type="button" className="save-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
    </>
  );
}
