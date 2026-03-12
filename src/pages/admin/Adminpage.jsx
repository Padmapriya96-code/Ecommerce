
import React, { useState,useEffect } from "react";
import "./AdminDashboard.css";
// import AddProduct from "./AddProduct";
import PEnrollment from "../PEnrollment";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import Categories from "../customer/Categories";
import Users from "./Users";
import UserOrders from "./UserOrders";
import Reports from "./Reports";
import Dashboard from "./Dashboard";
import { FaUser } from "react-icons/fa";

export default function Adminpage() {
  
   const [activePage, setActivePage] = useState("penrrollment");
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
   const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const[userEmail, setUserEmail]=useState("");
  const username = (userEmail || "").split("@")[0];

  useEffect(()=>{
      const email=localStorage.getItem("email");
      if(email){
        setUserEmail(email);
      }
    },[]);
    

  // ✅ Load from localStorage on page load
  // useEffect(() => {
  //   const stored = JSON.parse(localStorage.getItem("products")) || [];
  //   setProducts(stored);
  // }, []);
  // Load products from backend
  useEffect(() => {
    fetch("https://localhost:7196/Categories/GetProducts")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);
  // Load categories (for mapping categoryId → name)
  useEffect(() => {
    fetch("https://localhost:7196/Categories/GetallCategories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  // const handleAddOrUpdate = (product) => {
  //   let updatedProducts;

  //   if (editingProduct) {
  //     // update existing
  //     updatedProducts = products.map((p) =>
  //       p.id === editingProduct.id ? { ...product, id: p.id } : p
  //     );
  //     setEditingProduct(null);
  //   } else {
  //     // add new
  //     updatedProducts = [...products, { ...product, id: Date.now() }];
  //   }

  //   setProducts(updatedProducts);
  //   localStorage.setItem("products", JSON.stringify(updatedProducts)); // ✅ save to storage
  //   setActivePage("products");
  // };
  const handleAddOrUpdate = (product) => {
    // After add/update, refresh product list from backend
    fetch(`https://localhost:7196/Categories/GetProducts`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setActivePage("products");
        setEditingProduct(null);
      })
      .catch((err) => console.error(err));
  };

  // const handleDelete = (id) => {
  //   const updatedProducts = products.filter((p) => p.id !== id);
  //   setProducts(updatedProducts);
  //   localStorage.setItem("products", JSON.stringify(updatedProducts)); // ✅ save
  // };
// 🔥 Delete product via API
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`https://localhost:7196/Categories/DeleteProduct/DeleteProduct/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts(products.filter((p) => p.productId !== id));
        alert("✅ Product deleted successfully!");
      } else {
        const err = await res.json();
        alert("❌ Failed: " + err.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("❌ Server error");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setActivePage("addProduct");
  };

  const renderContent = () => {
    switch (activePage) {
      case "products":
        return (
          <ProductList
            products={products}
            categories={categories} // pass categories for mapping
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        );
      case "addProduct":
        return (
          <PEnrollment onSave={handleAddOrUpdate} editingProduct={editingProduct} />
        );
        case "addcategory":
          return(<Categories/>);
          case "users":
            return<Users/>;
            case "orders":
              return<UserOrders/>
              case "reports":
                return<Reports/>
                case "dashboard":
                  return <Dashboard/>
            
        
      default:
        return <h2>📌 Welcome to the Admin Dashboard</h2>;
    }
  };

  
  return (
     <div className="admin-dashboard-container">
      <div className="sidebar">
        <div className="logo">Admin Panel</div>
        <ul>
          <li onClick={() => setActivePage("dashboard")}>Dashboard</li>
          <li onClick={() => setActivePage("products")}>Products</li>
          <li onClick={() => setActivePage("addProduct")}>Add Product</li>
          <li onClick={() => setActivePage("addcategory")}>Add category</li>
          <li onClick={() => setActivePage("orders")}>Orders</li>
          <li onClick={() => setActivePage("users")}>Users</li>
          <li onClick={() => setActivePage("reports")}>Reports</li>
        </ul>
        
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="main-content">
        <div className="header">
          <h1><FaUser />Welcome,{username}! Admin Dashboard</h1>
        </div>
        <div className="content-box">{renderContent()}</div>
      </div>
    </div>
  );
}
