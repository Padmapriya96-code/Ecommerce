import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";
import "./Profile.css";
import CartHeader from "../CartHeader";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  
 useEffect(() => {
  if (!email) {
    navigate("/login");
    return;
  }

  const encodedEmail = encodeURIComponent(email);

  fetch(`https://localhost:7196/Categories/GetProfile/GetProfile/${encodedEmail}`)
    .then((res) => {
      if (!res.ok) {
        if (res.status === 404) return {}; // No profile yet
        throw new Error(`Server returned ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      setProfile(data || { email });
      setLoading(false);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      setError("Failed to load profile");
      setLoading(false);
    });
}, [email, navigate]);


  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="error">{error}</p>;

  if (editMode) {
    return (
      <EditProfile
        profile={profile}
        onSave={() => {
  const encodedEmail = encodeURIComponent(profile.email);
  fetch(`https://localhost:7196/Categories/GetProfile/GetProfile/${encodedEmail}`)
    .then((res) => res.json())
    .then((data) => {
      setProfile(data);
      setEditMode(false);
    })
    .catch((err) => {
      console.error("Refetch error:", err);
      setEditMode(false);
    });
        }}
        onCancel={() => setEditMode(false)}
      />
    );
  }

  return (
    <>
  
  <CartHeader />

    <div className="profile-page">
      
      <h2>My Profile</h2>
      <div className="profile-card">
        <p><strong>First Name:</strong> {profile.name || "Not set"}</p>
<p><strong>Email:</strong> {profile.email || "Not set"}</p>
<p><strong>Phone:</strong> {profile.phone || "Not set"}</p>
<p><strong>Address:</strong> {profile.address || "Not set"}</p>
      </div>
      <button className="edit-btn" onClick={() => setEditMode(true)}>
        Edit Profile
      </button>
    </div>
    </>
  );
}
