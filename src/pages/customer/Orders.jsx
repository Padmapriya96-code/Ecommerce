import React,{useState,useEffect} from 'react';
import axios from "axios";
import CartHeader from "../../pages/CartHeader";

export default function Orders() {
  const[orders,setOrders]=useState([]);
  const email=localStorage.getItem("email");
 useEffect(() => {
  fetch(`https://localhost:7196/Categories/GetOrders/GetOrders/${email}`)
    .then(res => res.json())
    .then(data => {
      console.log("Orders API response:", data);  
      setOrders(data);
    })
    .catch(err => console.error(err));
}, [email]); 


const downloadInvoice = async (orderId) => {
  try {
    const response = await axios.get(
      `https://localhost:7196/invoice/download/${orderId}`,
      { responseType: "blob" }   // Important: PDF as blob
    );

    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", `Invoice_${orderId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Invoice download failed:", error);
    alert("Unable to download invoice");
  }
};


  return (
   
    <div style={{ padding: "20px" }}>
       <><CartHeader/></>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
              background: "#f9f9f9"
            }}
          >
            <h3>Order ID: {order.id}</h3>
            <p>Total: ₹{order.total}</p>
            <p>Card Last 4: ****{order.paymentInfo?.cardLast4}</p>
            <p>Date: {order.createdAt?.split("T")[0]}</p>

            <h4>Items:</h4>
            {order.orderItems1?.map((item) => (
              <div key={item.productId} style={{ marginLeft: "15px", marginBottom: "5px" }}>
                {item.name} × {item.quantity} — ₹{item.price}
              </div>
            ))}

            {/* ---- Download button ONCE per order ---- */}
            <button
              onClick={() => downloadInvoice(order.id)}
              style={{
                marginTop: "12px",
                padding: "8px 15px",
                backgroundColor: "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              📄 Download Invoice
            </button>
          </div>
        ))
      )}
    </div>
  )
}
