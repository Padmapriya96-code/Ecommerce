import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

export default function ProductsCards({ products ,searchText}) {
  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cartItems.findIndex(
      (item) => item.productId === product.productId
    );

    if (existingIndex >= 0) {
      cartItems[existingIndex].quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    navigate("/cart");
  };

  const goToDetails = (product) => {
    navigate(`/product/${product.productId}`, { state: { product } });
  };
   // ⭐ FILTER PRODUCTS BY SEARCH TEXT
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="user-products">
      <h2>🛍️ Available Products</h2>
      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p>No products available.</p>
        ) : (
          filteredProducts.map((p) => (
            <div className="product-card" key={p.productId}>
              {p.imagePath && (
                <img
                  src={`https://localhost:7196${p.imagePath}`}
                  alt={p.name}
                  style={{ cursor: "pointer" }}
                  onClick={() => goToDetails(p)}
                />
              )}

              <h3>{p.name}</h3>
              <p>Price: ₹{p.price}</p>

              <span>
                <button onClick={() => handleBuyNow(p)}>Buy Now</button>
                <button onClick={() => goToDetails(p)}>View Details</button>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
