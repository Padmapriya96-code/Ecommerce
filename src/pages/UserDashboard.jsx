
import React,{useEffect,useState} from "react";
import{useNavigate} from "react-router-dom";
// import axios from "axios";
import "./UserDashboard.css";

export default function UserDashboard() {
  const navigate=useNavigate();
  
  const[userEmail,setUserEmail]=useState("");
  const[userRole,setUserRole]=useState("");
  const handleLogout=()=>{
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/login");

    
  };
  useEffect(() => {
    // ✅ Get user info from localStorage
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    if (!email) {
      // Redirect to login if email not found
      navigate("/login");
    } else {
      setUserEmail(email);
      setUserRole(role);
    }
  }, [navigate]);
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">🛍️MyShop</h2>
        <nav>
          <ul>
            <li><a href="/pages/userdashboard">Dashboard</a></li>
            <li><a href="/profile">👤 Profile</a></li>
            <li><a href="/orders">📦 Orders</a></li>
            <li><a href="/products">🛒 Products</a></li>
            <li><a href="/settings">⚙️ Settings</a></li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                🚪 Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      {/*main content*/}
       <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome back, {userEmail} 👋</h1>
          <p>Your role: <strong>{userRole}</strong></p>
        </header>

        <section className="cards">
          <div className="card">
            <h3>Orders</h3>
            <p>0 Total Orders</p>
          </div>
          <div className="card">
            <h3>Wishlist</h3>
            <p>0 Items Saved</p>
          </div>
          <div className="card">
            <h3>Cart</h3>
            <p>0 Items in Cart</p>
          </div>
        </section>

        <section className="recent-section">
          <h2>Recent Activity</h2>
          <p>No recent activity available.</p>
        </section>
      </main>
    </div>
  )
}
