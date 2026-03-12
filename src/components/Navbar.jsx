import React,{useEffect,useState} from "react";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import "./navbarstyle.css";
import{Link,useNavigate} from "react-router-dom";
 import SearchBar from "./SearchBar";

 


export default function Navbar({setSearchText }) {
  const[userEmail,setUserEmail]=useState(null);
  const navigate=useNavigate();
  useEffect(()=>{
    const email=localStorage.getItem("email");
    if(email){
      setUserEmail(email);
    }
  },[]);
  const handleLogout=()=>{
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    setUserEmail(null);
    navigate("/login");
  };
  return (
    
    <div className="navbar-container">
      <div className="navbar">

        {/* LOGO */}
        <h1 className="logo">EcommerceWebsite</h1>

       
       
         <div className="search-section">
          <SearchBar setSearchText={setSearchText}  />
        </div>

        {/* NAV OPTIONS */}
        <div className="nav-options">

          {userEmail ? (
            <div className="user-info">

              <div className="welcome-text">
                <FaUser /> Welcome, {userEmail.split("@")[0]}!
              </div>

              {/* My Profile */}
              <Link to="/profile" className="nav-link">
                My Profile
              </Link>

              {/* Wishlist */}
              <Link to="/wishlist" className="nav-link">
                ❤️ Wishlist
              </Link>

              {/* Orders */}
              <Link to="/orders" className="nav-link">
                Orders
              </Link>
              {/* LOGOUT */}
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>


            </div>
          ) : (
            <Link to="/login" className="login-button">
              <FaUser /> Login
            </Link>
          )}

          {/* CART */}
          <Link to="/cart" className="cart-btn">
            <FaShoppingCart /> Cart
          </Link>

          
          <button className="seller-btn">Become a Seller</button>

        </div>
      </div>
    </div>
  )
}
