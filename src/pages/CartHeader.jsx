import React, { useState, useEffect } from "react";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../pages/customer/CartHeader.css";
import {Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";



export default function Header() {
  const [username, setUsername] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Get username from localStorage
    const email = localStorage.getItem("email");
    if (email) setUsername(email.split("@")[0]); // Show only name before @

    // Get cart items count
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cartItems.length);
  }, []);

  return (
    <div className="header">
      {username && (
        <div className="user-info" style={{color:"blue"}}>
          <FaUser /> Welcome, {username}
        </div>
      )}
      <Link to="/"><FaHome size={24} /></Link>
      <Link to="/wishlist" className="link-btn" style={{textDecoration:"none"}}>
                ❤️ Wishlist
              </Link>
       
      <div className="cart-info" onClick={() => navigate("/cart")} style={{ cursor: "pointer",color:"blue" }}>
        <FaShoppingCart /> Cart ({cartCount})
      </div>
    </div>
  );
}
