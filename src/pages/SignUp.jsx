import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import  "./Login.css";
import axios from "axios";
import { FaHome } from "react-icons/fa";

export default function SignUp() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 👈 useNavigate hook
  

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // 🔹 Block admin email
  //   if (email === "admin@shop.com") {
  //     alert("⚠️ This email is reserved for Admin. Please use another email.");
  //     return;
  //   }

  //   const users = JSON.parse(localStorage.getItem("users")) || [];
  //   const existingUser = users.find((u) => u.email === email);

  //   if (existingUser) {
  //     alert("⚠️ User already exists. Please login.");
  //     navigate("/login"); // 👈 redirect
  //     return;
  //   }

  //   // 🔹 Save new user
  //   users.push({ email, password });
  //   localStorage.setItem("users", JSON.stringify(users));

  //   alert("✅ Signup successful! Please login.");
  //   navigate("/login"); // 👈 redirect
  // };
  const handleSignup=async (e)=>{
    e.preventDefault();
    try{
      const res=await axios.post('https://localhost:7196/Categories/Signup/signup',{email,password});
      console.log(res.data); // 👈 use it
alert(res.data.message || "✅ Signup successful");

      navigate("/login");
    }
    catch(err){
      console.error(err);
      alert("⚠️ Signup failed.");
    };
  }
  return (
    <div> <div className="login-container">
      <div className="login-box">
        <h2>Sign Up</h2>

        <form onSubmit={handleSignup}>
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
          

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
         
        <p className="login-text">
          Already have an account?{" "}
          <a href="/login" className="link">
            Login
          </a>
        </p>
        <p className="signup-text">
                  <a href="/" className="link"><FaHome size={20} /> Home</a>
                </p>
      </div>
    </div></div>
  )
}
