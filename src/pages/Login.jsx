import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  "./Login.css";
import axios from "axios";
import { FaHome } from "react-icons/fa";
export default function Login() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
  const handleLogin=async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.post('https://localhost:7196/Categories/Login/login',{email,password});
      const{role}=res.data;
      //save user info in localstorage
      localStorage.setItem("email", email);   // ✅ email entered by user
      localStorage.setItem("role", role);
      alert("✅ Login successful");
      if(role==="admin"){
        navigate("/admin/adminpage");
      }
      else{navigate("/");

      }

    }
    catch (err) {
      console.error(err);
      alert("⚠️ Invalid email or password.");
    }
    
  };

  return (
    <div><div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account?{" "}
          <a href="/signup" className="link">
            Sign Up
          </a>
         
        </p>
        <p className="signup-text">
          <a href="/" className="link"><FaHome size={20} /> Home</a>
        </p>
      </div>
    </div>
  
</div>
  )
}
