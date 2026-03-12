import React,{useState,useEffect} from 'react';
import "./users.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Reports() {
    const[PaymentInfo,setPaymentInfo]=useState([]);
    const[fromDate,setFromDate]=useState("");
    const[toDate,setToDate]=useState("");
    useEffect(()=>{
        fetch(`https://localhost:7196/Categories/GetallPaymentInfo`)
        .then((res)=>res.json())
        .then((data)=>setPaymentInfo(data))
        .catch((err)=>console.error("Fetch error",err));
    },[]);
    const filteredPayments=PaymentInfo.filter((p)=>{
        if(!fromDate||!toDate) return true;
        const date=p.createdAt?.split("T")[0];
        return date >=fromDate &&date<=toDate;
    })
     const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Payment Information Report", 14, 15);

   autoTable(doc, {
    startY: 25,
    head: [["Order Id", "Name", "Card Last 4", "Expiry"]],
    body: PaymentInfo.map(p => [p.orderId, p.name, p.cardLast4, p.expiry]),
  });

  doc.save("PaymentReport.pdf");
};
  return (
    <div>
        <h2>Payment Informations</h2>
        <div className="filter-box">
            <label>From:</label>
            <input type="date" value={fromDate} onChange={(e)=>setFromDate(e.target.value)}/>
            <label>To:</label>
            <input type="date" value={toDate} onChange={(e)=>setToDate(e.target.value)}/>
        
        <button className="download-btn" onClick={downloadPDF}>
        📄 Download PDF
      </button>
      </div>
        <table className="my-table">
            <thead>
                <tr>
                    
                    <th>Order Id</th>
                    <th>Name</th>
                    <th>Card details</th>
                    <th>Card expiry</th>
                </tr>
            </thead>
            <tbody>
                {filteredPayments.map((F)=>(
                    <tr key={F.id}>
                        <td>{F.orderId}</td>
                        <td>{F.name}</td>
                        <td>{F.cardLast4}</td>
                        <td>{F.expiry}</td>
                    </tr>

                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Reports

