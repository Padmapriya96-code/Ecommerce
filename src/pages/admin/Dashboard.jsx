import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";
import "./users.css";

function Dashboard() {
    const [OrderItems1, setOrderItems] = useState([]);
  const [Orders1, setOrders] = useState([]);
  const [PaymentInfo, setPaymentInfo] = useState([]);

  // ---------------- FETCH ALL 3 TABLES ----------------
  useEffect(() => {
    fetch(`https://localhost:7196/Categories/GetallOrderItems`)
      .then((res) => res.json())
      .then((data) => setOrderItems(data));
  }, []);

  useEffect(() => {
    fetch(`https://localhost:7196/Categories/GetallOrder1`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  useEffect(() => {
    fetch(`https://localhost:7196/Categories/GetallPaymentInfo`)
      .then((res) => res.json())
      .then((data) => setPaymentInfo(data));
  }, []);

  // ---------------------------------------------------------
  // 📘 Chart 1 — Total Orders per User
  // ---------------------------------------------------------
  const ordersPerUser = Orders1.reduce((acc, o) => {
    acc[o.userEmail] = (acc[o.userEmail] || 0) + 1;
    return acc;
  }, {});
  const ordersPerUserData = Object.keys(ordersPerUser).map((email) => ({
    userEmail: email,
    totalOrders: ordersPerUser[email],
  }));

  // ---------------------------------------------------------
  // 📗 Chart 2 — Revenue Per Day
  // ---------------------------------------------------------
  const revenuePerDay = Orders1.reduce((acc, item) => {
    const date = item.createdAt.split("T")[0];
    acc[date] = (acc[date] || 0) + item.total;
    return acc;
  }, {});

  const revenueChartData = Object.keys(revenuePerDay).map((date) => ({
    date: date,
    revenue: revenuePerDay[date],
  }));

  // ---------------------------------------------------------
  // 📕 Chart 3 — Most Ordered Products
  // ---------------------------------------------------------
  const productCount = OrderItems1.reduce((acc, item) => {
    acc[item.name] = (acc[item.name] || 0) + item.quantity;
    return acc;
  }, {});

  const productChartData = Object.keys(productCount).map((name) => ({
    name: name,
    quantity: productCount[name],
  }));

  // ---------------------------------------------------------
  // 📙 Chart 4 — Payment Method / Name Count
  // ---------------------------------------------------------
  const paymentNameCount = PaymentInfo.reduce((acc, p) => {
    acc[p.name] = (acc[p.name] || 0) + 1;
    return acc;
  }, {});

  const paymentChartData = Object.keys(paymentNameCount).map((name) => ({
    name: name,
    value: paymentNameCount[name],
  }));

  const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

  return (
    <div>
      <h1>📊 Complete Reports Dashboard</h1>

      {/* ------------------- CHART 1 -------------------- */}
      <h2>Orders Per User</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={ordersPerUserData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="userEmail" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalOrders" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ------------------- CHART 2 -------------------- */}
      <h2>Revenue Per Day</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={revenueChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="revenue" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ------------------- CHART 3 -------------------- */}
      <h2>Most Ordered Products</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={productChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ------------------- CHART 4 -------------------- */}
      <h2>Payment Report (Names Count)</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={paymentChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {paymentChartData.map((entry, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      </div>
  )
}

export default Dashboard