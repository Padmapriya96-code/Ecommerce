import React ,{useState}from "react";
import "./ProductList.css";
import "./searchbarproducts.css";
import { FaSearch } from "react-icons/fa";





export default function ProductList({ products, onDelete, onEdit }) {
   const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (!products.length) {
    return <h3>No products found. Please add some.</h3>;
  }

  return (
    <div className="product-list-container">
    
      <div className="search-box"> 
        <FaSearch className="search-icon" />

        <input
       
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Show message if no results */}
      {!filteredProducts.length ? (
        <h3>No matching products found.</h3>):(
    <div className="product-list">
      {filteredProducts.map((product) => (
        <div className="product-card" key={product.productId}>
          {/* {product.image && <img src={product.image} alt={product.name} />} */}
          {product.imagePath && (
        <img
          src={`https://localhost:7196${product.imagePath}`}
          alt={product.name}
          // className="product-img"
        />
      )}
          <h3>{product.name}</h3>
          <p>Category: {product.categoryId}</p>
          <p>Price: ₹{product.price}</p>
          <p>Quantity: {product.quantity}</p>
          <div className="card-buttons">
            <button onClick={() => onEdit(product)}>✏️ Edit</button>
            <button onClick={() => onDelete(product.productId)}>🗑️ Delete</button>
          </div>
        </div>
      ))}

    </div>
        )}
        </div>
  );
}
