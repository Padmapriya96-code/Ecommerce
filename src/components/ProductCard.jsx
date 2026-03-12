
import React, {  useState,useEffect } from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function ProductCard({searchText}) {
   const [products, setProducts] = useState([]);
   
   const[wishlist,setWishlist]=useState(()=>{
    return JSON.parse(localStorage.getItem("wishlist"))||[];
   })
   const navigate=useNavigate();
   useEffect(() => {
    fetch("https://localhost:7196/Categories/GetProducts")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

 const filteredProducts = products.filter((p) => {
  const productName = p?.name?.toLowerCase() || "";
  const search = (searchText || "").toLowerCase();
  return productName.includes(search);
});
   const handleBuyNow = (product) => {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the product already exists in cart
  const existingIndex = cartItems.findIndex((item) => item.productId === product.productId);

  if (existingIndex >= 0) {
    // If product exists, increase quantity
    cartItems[existingIndex].quantity += 1;
  } else {
    // If new product, add it with quantity 1
    cartItems.push({ ...product, quantity: 1 });

  }

  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cartItems));

  // Navigate to cart page
  navigate("/cart");
};
 
  
   
  const goToDetails = (product) => {
    navigate(`/product/${product.productId}`, { state: { product } }); // 👈 Pass product details
  };
  const toggleWishlist = (product) => {
    let updatedWishlist = [...wishlist];

    const index = updatedWishlist.findIndex(
      (item) => item.productId === product.productId
    );

    if (index >= 0) {
      // Remove from wishlist
      updatedWishlist.splice(index, 1);
    } else {
      // Add to wishlist
      updatedWishlist.push(product);
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.productId === productId);
  };
  

  return (
    
    <div className="user-products">
      <h2>🛍️ Available Products</h2>
      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p>No products available.</p>
        ) : (
         filteredProducts.map((p) => (
            <div className="product-card" key={p.productId}>
              {/* ❤️ WISHLIST ICON */}
              <div className="wishlist-icon" onClick={() => toggleWishlist(p)}>
                {isWishlisted(p.productId) ? (
                  <FaHeart color="red" size={22} />
                ) : (
                  <FaRegHeart size={22} />
                )}
              </div>
              {/* <img src={p.image} alt={p.name} /> */}
              {/* 👇 Show image */}
      {p.imagePath && (
        <img
          src={`https://localhost:7196${p.imagePath}`}
          alt={p.name}
          // className="product-img"
          onClick={() => goToDetails(p)} // 👈 Navigate on click
                  style={{ cursor: "pointer" }}
        />
      )}
              <h3>{p.name}</h3>
              {/* <p>Category: {p.category}</p> */}
              <p>Price: ₹{p.price}</p>
              {/* <p>Stock: {p.quantity}</p> */}
              <span><button onClick={() => handleBuyNow(p)}>Buy Now</button>

              <button onClick={() => goToDetails(p)}>View Details</button></span>
            </div>
          ))
        )}
      </div>
    </div>
  );
  
}
