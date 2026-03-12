import React,{useState,useEffect} from 'react';
import "./product.css";


export default function AddProduct() {
     const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryId: "",
    productName: "",
    price: "",
    quantity: "",
    productImage: null,
  });

  // Fetch categories from API
  useEffect(() => {
    fetch("https://localhost:7196/Categories/GetallCategories") // Your WebAPI endpoint
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error loading categories:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = new FormData();
    sendData.append("categoryId", formData.categoryId);
    sendData.append("productName", formData.productName);
    sendData.append("price", formData.price);
    sendData.append("quantity", formData.quantity);
    sendData.append("productImage", formData.productImage);

    const res = await fetch("https://localhost:7196/Categories/GetProducts", {
      method: "POST",
      body: sendData,
    });

    if (res.ok) {
      alert("✅ Product saved successfully!");
    } else {
      alert("❌ Failed to save product");
    }
  };
  
  return (
    <div><div className="form-container">
      <h2>Product Enrollment</h2>
      <form onSubmit={handleSubmit}>
        {/* Category */}
        <div className="form-group">
          <label>Category</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Product Name */}
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div className="form-group">
          <label>Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Quantity */}
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label>Product Image</label>
          <input
            type="file"
            name="productImage"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn">Save Product</button>
        <button type="submit" className="btn">Update Product</button>
        <button type="submit" className="btn">Getall Product</button>
      </form>
    </div></div>
  )
}
