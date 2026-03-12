import React from "react";
import "./wishlistcard.css";
import CartHeader from "../../pages/CartHeader";

export default function Wishlist() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  return (
    <div>
      <><CartHeader/></>
      <h2>❤️ My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        wishlist.map((item) => (
          <div key={item.productId} className="wishlist-card">
            <h3>{item.name}</h3>
            <img
              src={`https://localhost:7196${item.imagePath}`}
              alt={item.name}
            />
            <p>₹{item.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

