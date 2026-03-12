
import CategoryMenu from "./components/CategoryMenu";
import Navbar from "./components/Navbar";
// import ProductCard from "./components/ProductCard";

import "./components/style.css";
 import Home from "./pages/customer/Home";
import React from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ProductDetails from "./components/ProductDetails";
import UserDashboard from "./pages/UserDashboard";
import Wishlist from "./pages/customer/Wishlist";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Adminpage from "./pages/admin/Adminpage";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import Orders from "./pages/customer/Orders";
import Profile from "./pages/customer/Profile";
import EditProfile from "./pages/customer/EditProfile";

// import ProductsLists from "./components/ProductsLists";



// import AddProduct from "./pages/admin/AddProduct";
import { useState } from "react";





function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <div>
      
      
      <Router>
      
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <>
            <Navbar setSearchText={setSearchText}  />
              <CategoryMenu />
              <Home searchText={searchText}/>
              {/* <ProductCard />
              */}
              
            </>
          }
        />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/payment" element={<PaymentPage/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/editprofile" element={<EditProfile/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>

        {/* Admin routes */}
        <Route path="/admin/adminpage" element={<Adminpage />} />
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/pages/userdashboard" element={<UserDashboard/>}/>
        
      </Routes>
    </Router>
      
      
    {/* <AddProduct/>
        */}
        {/* <Adminpage/> */}
        
    </div>
    
  );
}

export default App;
