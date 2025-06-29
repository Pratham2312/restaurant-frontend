import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/order`);
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/order/${orderId}`, {
        status: newStatus,
      });
      fetchOrders(); // Refresh after update
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      {orders.length === 0 ? (
        <p>No orders received yet.</p>
      ) : (
        <div className="grid">
          {orders.map((order) => (
            <div key={order._id} className="menu-card">
              <h3>Table: {order.tableNumber}</h3>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - Qty: {item.quantity}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              {order.status === "Pending" && (
                <button
                  className="btn"
                  onClick={() => updateStatus(order._id, "Completed")}
                >
                  Mark as Completed
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPage;
