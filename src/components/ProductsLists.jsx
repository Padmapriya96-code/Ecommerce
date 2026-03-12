import React, { useEffect, useState } from "react";

function ProductsLists({ selectedCategory }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7196/Products/GetAllProducts")
      .then((res) => res.json())
      .then((data) => setProducts(data?.data ?? []));
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(
        (p) => p.categoryName?.toLowerCase() === selectedCategory.toLowerCase()
      )
    : products;

  return (
    <div>
      <h2>Products</h2>

      {filteredProducts.length === 0 ? (
        <p>No products found...</p>
      ) : (
        filteredProducts.map((p) => (
          <div key={p.productId}>
            <h4>{p.name}</h4>
            <p>{p.categoryName}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductsLists;
