import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function CaptainPage() {
  const [menu, setMenu] = useState([]);
  const [table, setTable] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tableParam = searchParams.get("table");
    if (tableParam) setTable(tableParam);

    const fetchMenu = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/menu`);
        setMenu(res.data);
      } catch (error) {
        console.error("Menu fetch failed");
      }
    };

    fetchMenu();
  }, [searchParams]);

  const handleQuantityChange = (id, quantity) => {
    setSelectedItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const toggleSelectItem = (item) => {
    setSelectedItems(prev => {
      const exists = prev.find(i => i.id === item._id);
      if (exists) return prev.filter(i => i.id !== item._id);
      return [...prev, { id: item._id, name: item.name, quantity: 1 }];
    });
  };

  const isSelected = (id) => selectedItems.find(i => i.id === id);

  const handleSubmit = async () => {
    if (!table || selectedItems.length === 0) {
      alert("Please enter table number and select items.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/order`, {
        tableNumber: table,
        items: selectedItems,
      });
      alert("Order Placed Successfully!");
      setSelectedItems([]);
    } catch (error) {
      console.error("Order failed", error);
      alert("Error placing order.");
    }
  };

  return (
    <div className="container">
      <h2>Captain Order</h2>
      <input
        className="input"
        placeholder="Table Number"
        value={table}
        onChange={(e) => setTable(e.target.value)}
      />

      <div className="grid">
        {menu.map((item) => (
          <div key={item._id} className="menu-card">
            <img src={item.image} alt={item.name} className="menu-image" />
            <h3>{item.name}</h3>
            <p>{item.category} — ₹{item.price}</p>
            <button className="btn" onClick={() => toggleSelectItem(item)}>
              {isSelected(item._id) ? "Remove" : "Add"}
            </button>

            {isSelected(item._id) && (
              <input
                type="number"
                className="input"
                min={1}
                value={selectedItems.find(i => i.id === item._id)?.quantity || 1}
                onChange={(e) =>
                  handleQuantityChange(item._id, parseInt(e.target.value))
                }
              />
            )}
          </div>
        ))}
      </div>

      <button className="btn" onClick={handleSubmit}>
        Submit Order
      </button>
    </div>
  );
}

export default CaptainPage;
