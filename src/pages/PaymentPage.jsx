import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PaymentPage.css";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ get total & cart from previous page
  const totalAmount = location.state?.total || 0;
  const cartItems = location.state?.cart || [];

  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    cvv: "",
    expiry: ""
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // ✅ Mask card number (only last 4)
    const last4 = formData.cardNumber.slice(-4);

    const orderData = {
      userEmail: localStorage.getItem("email"),   // user email of logged-in user
      total: totalAmount,
      orderItems: cartItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      paymentInfo: {
        cardLast4: last4,
        name: formData.name,
        expiry: formData.expiry
      }
    };

    console.log("Order data:", orderData);

    try {
      const response = await fetch("https://localhost:7196/Categories/CreateOrder/CreateOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        alert(`✅ Payment of ₹${totalAmount} Successful!`);

        localStorage.removeItem("cart");

        navigate("/orders");   // ✅ Go to orders page
      } else {
        alert("❌ Payment failed. Try again!");
      }
    } catch (err) {
      console.error(err);
      alert("⚠ Something went wrong!");
    }
  };

  return (
    <div className="payment-page">
      <h2>Payment Details</h2>
      <h3>Total Amount: ₹{totalAmount}</h3>

      <form onSubmit={handlePayment}>
        
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="expiry"
          placeholder="MM/YY"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="cvv"
          placeholder="CVV"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Cardholder Name"
          onChange={handleChange}
          required
        />

        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
}

