import React,{useState,useEffect} from 'react';
import "./PEnrollment.css";
import axios from 'axios';


export default function PEnrollment({onSave, editingProduct}) {
    const [product, setProduct] = useState({
    categoryId: "",
    name: "",
    price: "",
    quantity: "",
    // image: ""
    imagePath:"",
    description:"",
    specification:""
  });
  const [imageFile, setImageFile] = useState(null);
 const [categories, setCategories] = useState([]); // ✅ to store API categories

  useEffect(() => {
    if (editingProduct) {
      setProduct({
      categoryId: editingProduct.categoryId || "",
      name: editingProduct.name || "",
      price: editingProduct.price || "",
      quantity: editingProduct.quantity || 0,
      imagePath: editingProduct.imagePath || "",
      description: editingProduct.description || "",
      specification: editingProduct.specification || ""
    });
    }
  }, [editingProduct]);
  // ✅ Fetch categories from API
  useEffect(() => {
    fetch('https://localhost:7196/Categories/GetallCategories') // 👈 change to your API URL
      .then((res) => res.json())
      .then((data) => {
        setCategories(data); // assuming API returns an array of { id, name }
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleChange = (e) => {
    // setProduct({ ...product, [e.target.name]: e.target.value });
    const { name, value } = e.target;
  setProduct((prev) => ({
    ...prev,
    [name]: value
  }));
  };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setProduct({ ...product, image: reader.result });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // handle file upload (keep raw file, not Base64)
  const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImageFile(file); // ✅ keep file for FormData

    const reader = new FileReader();
    reader.onloadend = () => {
      setProduct({ ...product, imagePath: reader.result }); // just for preview
    };
    reader.readAsDataURL(file);
  }
};

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSave(product); // 👈 send product to Adminpage
  //   setProduct({ category: "", name: "", price: "", quantity: "", image: "" });
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", product.name);
    formData.append("Price", product.price);
    formData.append("Quantity", product.quantity);
    formData.append("CategoryId", product.categoryId);
    formData.append("Description", product.description); // ✅ add description
    formData.append("Specification", product.specification); // ✅ add specification

    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      const res = await axios.post(
        'https://localhost:7196/Categories/AddProducts/AddProducts',
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("✅ Product saved successfully!");
      onSave(res.data);

      // reset form
      setProduct({ categoryId: "", name: "", price: "", quantity: "", imagePath:"",description: "",
  specification: ""});
      setImageFile(null);
    } catch (err) {
      console.error("❌ Error saving product:", err);
      alert("Failed to save product");
    }
  };

  
  
  return (
     <div className="add-product-container">
      <h2 className="form-title">
        {editingProduct ? "✏️ Edit Product" : "📦 Add New Product"}
      </h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        
         {/* ✅ Dynamic dropdown */}
        <select
          name="categoryId"
          value={product.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name||""}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price||""}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={product.quantity||""}
          onChange={handleChange}
          required
        />
        <textarea name="description"
        placeholder="Product Description"
        value={product.description || ""}
        onChange={handleChange} required/>
        <textarea
          name="specification"
          placeholder="Product Specification"
          value={product.specification||""}
          onChange={handleChange}
        />

        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {product.imagePath && (
          <img src={product.imagePath} alt="Preview" className="preview-img" />
        )}

        <button type="submit" className="submit-btn">
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );

}
