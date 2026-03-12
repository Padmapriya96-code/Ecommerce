import React, {useEffect, useState } from 'react';
import "./users.css";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'; 

function UserOrders() {
    const[OrderItems1,setUSerOrders]=useState([]);
    const[Orders1,setOrders1]=useState([]);
     const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

    useEffect(()=>{
        fetch(`https://localhost:7196/Categories/GetallOrderItems`)
            .then((res)=>res.json())
            .then((data)=>setUSerOrders(data))
            .catch((err)=>console.error("Fetch user orders error",err));
    },[]);
     
    useEffect(()=>{
        fetch(`https://localhost:7196/Categories/GetallOrder1`)
            .then((res)=>res.json())
            .then((data)=>setOrders1(data))
            .catch((err)=>console.error("Fetch user orders error",err));
    },[]);
    // Filter orders based on date
  const filteredOrders = Orders1.filter((o) => {
    if (!fromDate && !toDate) return true;

    const orderDate = new Date(o.createdAt);
    const start = fromDate ? new Date(fromDate) : new Date("1900-01-01");
    const end = toDate ? new Date(toDate) : new Date("2999-12-31");

    return orderDate >= start && orderDate <= end;
  });

  // Generate PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.text("User Order Report", 14, 10);

    // Order Items Table
   autoTable(doc, {
  head: [["Order ID", "Product ID", "Name", "Qty", "Price"]],
  body: OrderItems1.map(o => [
    o.orderId,
    o.productId,
    o.name,
    o.quantity,
    o.price
  ]),
});

    // Orders Table
    autoTable(doc, {
  head: [["User Email", "Total", "Created At"]],
  body: filteredOrders.map(o => [
    o.userEmail,
    o.total,
    o.createdAt
  ]),
});

    doc.save("OrdersReport.pdf");
  };

  return (
    <div>
        <h2>Order Report</h2>
         {/* Date Filter Section */}
      <div className="filter-box">
        <label>From Date:</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <label>To Date:</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <button className="download-btn" onClick={downloadPDF}>
          Download Orders PDF
        </button>
      </div>
      <h2>Orders</h2>
        <table className="my-table">
            
            <thead>
                <tr>
                    <th>User Email</th>
                    <th>Total</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tbody>
                {filteredOrders.map((I)=>(
                    <tr key={I.id}>
                        <td>{I.userEmail}</td>
                        <td>{I.total}</td>
                        <td>{I.createdAt}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <h2>Ordered Items details</h2>
        <table className="my-table">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {OrderItems1.map((o)=>(
                    <tr key={o.id}>
                        <td>{o.orderId}</td>
                        <td>{o.productId}</td>
                        <td>{o.name}</td>
                        <td>{o.quantity}</td>
                        <td>{o.price}</td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
        
    </div>
  )
}

export default UserOrders