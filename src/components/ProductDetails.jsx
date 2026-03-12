import React, { useState,useEffect} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import CartHeader from "../pages/CartHeader";


export default function ProductDetails() {
  const { state } = useLocation();
  const product = state?.product;//passed from product card
  const[details,setDetails]=useState(null);

  const [quantity] = useState(1);
  const navigate=useNavigate();
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
  useEffect(() => {
  if (product?.categoryId) {
    fetch(`https://localhost:7196/Categories/GetbyCategoryId/${product.categoryId}`)
      .then((res) => res.json())
      .then((data) => {
          console.log("Fetched details 👉", data);
          setDetails(data);
        })
      .catch((err) => console.error(err));
  }
}, [product]);

  if (!product) return <h2>⚠️ No product passed</h2>;
  if (!details) return <h2>⏳ Loading product details...</h2>;

  // const increment = () => setQuantity((q) => q + 1);
  // const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const addToCart = (product) => {
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
    alert(`✅ Added ${quantity} ${product.name}(s) to cart`);
    // 👉 here you can save in localStorage or global Cart context
  };

  // const buyNow = () => {
  //   alert(`🛒 Buying ${quantity} ${product.name}(s)`);
  //   // 👉 redirect to checkout page
  // };

  return (
    <div><CartHeader/>
    <div className="product-details">
      
      <div className="product-image-box">
      <img
        src={`https://localhost:7196${product.imagePath}`}
        alt={product.name}
      />
      <h3>Price: ₹{product.price}</h3>
      {/* <div className="quantity-control">
        <button onClick={decrement}>-</button>
        <span>{quantity}</span>
        <button onClick={increment}>+</button>
      </div> */}
      <div className="actions">
        <button onClick={()=>addToCart(product)}>Add to Cart</button>
        {/* <button onClick={handleBuyNow}>Buy Now</button> */}
        <button onClick={() => handleBuyNow(product)}>Buy Now</button>

      </div>
      </div>
      <div className="product-info">
      <h2>{details.name}</h2>
      <p>Category: {details.name}</p><span>
      <p>Description:{product.description}</p>
      <p>Specification:{product.specification}</p></span>
      </div>
      </div>
      </div>
  );
}
