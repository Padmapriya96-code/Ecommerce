import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import "./CartPage.css"; // Make sure to create/apply CSS
import CartHeader from "./CartHeader";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();
  
  


  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems);
   
  }, []);

  const removeFromCart = (productId) => {
    const updated = cart.filter((item) => item.productId !== productId);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const updateQuantity = (productId, change) => {
    const updated = cart.map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleProceed = () => {
    const email = localStorage.getItem("email");
    if (!email) {
      setShowLoginPopup(true); // ✅ Show popup if not logged in
      return;
    }
    navigate("/payment",{state:{total:totalAmount,cart:cart}}); // ✅ Continue to payment if logged in
  };

  return (
     <div><CartHeader/>

    <div className="cart-container">
      
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div className="cart-item" key={item.productId}>
            <img
              src={`https://localhost:7196${item.imagePath}`}
              alt={item.name}
            />
            <div className="quantity-controls">
              <h3>{item.name}</h3>
              <p>Price:₹{item.price}</p>
              <div><span>
              <button onClick={() => updateQuantity(item.productId, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.productId, 1)}>+</button>
              </span></div>
              <button onClick={() => removeFromCart(item.productId)}>Remove</button>
            </div>
          </div>
        ))
      )}

      <h3>Total: ₹{totalAmount}</h3>
      {cart.length > 0 && (
        <button onClick={handleProceed}>Proceed to Payment</button>
      )}

      {/* ✅ LOGIN POPUP */}
      {showLoginPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Login Required</h3>
            <p>You must login before placing an order.</p>
            <div className="popup-actions">
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => setShowLoginPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
   </div>
   
  );
}
