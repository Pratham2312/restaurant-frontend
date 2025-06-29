// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function OrderPage() {
//   const [menu, setMenu] = useState([]);
//   const [tableNumber, setTableNumber] = useState("");
//   const [selectedItems, setSelectedItems] = useState([]);

//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         const res = await axios.get(`${process.env.REACT_APP_API_URL}/menu`);
//         setMenu(res.data);
//       } catch (error) {
//         console.error("Failed to load menu", error);
//       }
//     };
//     fetchMenu();
//   }, []);

//   const handleQuantityChange = (id, quantity) => {
//     setSelectedItems(prev =>
//       prev.map(item => item.id === id ? { ...item, quantity } : item)
//     );
//   };

//   const toggleSelectItem = (item) => {
//     setSelectedItems(prev => {
//       const exists = prev.find(i => i.id === item._id);
//       if (exists) return prev.filter(i => i.id !== item._id);
//       return [...prev, { id: item._id, name: item.name, quantity: 1 }];
//     });
//   };

//   const handleSubmit = async () => {
//     if (!tableNumber || selectedItems.length === 0) {
//       alert("Enter table number and select at least one item");
//       return;
//     }

//     // try {
//     //   const res = await axios.post(`${process.env.REACT_APP_API_URL}/order`, {
//     //     tableNumber,
//     //     items: selectedItems
//     //   });
//     //   alert("Order placed!");
//     //   setTableNumber("");
//     //   setSelectedItems([]);
//     // } catch (error) {
//     //   console.error("Order submission failed:", error.response?.data || error.message);
//     //   alert("Failed to place order.");
//     // }

//     try {
//   const res = await axios.post(`${process.env.REACT_APP_API_URL}/order`, {
//     tableNumber,
//     items: selectedItems
//   });
//   console.log(res.data); 
//   alert("Order placed!");
//   setTableNumber("");
//   setSelectedItems([]);
// } catch (error) {
//   console.error("Order submission failed:", error.response?.data || error.message);
//   alert("Failed to place order.");
// }

//   };
  

//   const isSelected = (id) => selectedItems.find(i => i.id === id);

//   return (
//     <div className="container">
//       <h2>Place Order</h2>
//       <input
//         className="input"
//         placeholder="Table Number"
//         value={tableNumber}
//         onChange={(e) => setTableNumber(e.target.value)}
//       />

//       <div className="grid">
//         {menu.map(item => (
//           <div key={item._id} className="menu-card">
//             <img
//               src={item.image}
//               alt={item.name}
//               className="menu-image"
//             />
//             <h3>{item.name}</h3>
//             <p>{item.category} — ₹{item.price}</p>
//             <button className="btn" onClick={() => toggleSelectItem(item)}>
//               {isSelected(item._id) ? "Remove" : "Add"}
//             </button>

//             {isSelected(item._id) && (
//               <input
//                 type="number"
//                 className="input"
//                 placeholder="Quantity"
//                 min={1}
//                 value={selectedItems.find(i => i.id === item._id)?.quantity || 1}
//                 onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
//               />
//             )}
//           </div>
//         ))}
//       </div>

//       <button className="btn" onClick={handleSubmit}>Submit Order</button>
//     </div>
//   );
// }

// export default OrderPage;
import React, { useEffect, useState } from "react";
import axios from "axios";

function OrderPage() {
  const [menu, setMenu] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/menu`);
        setMenu(res.data);
      } catch (error) {
        console.error("Failed to load menu", error);
      }
    };
    fetchMenu();
  }, []);

  const toggleSelect = (item) => {
    setSelectedItems((prev) => {
      const exists = prev.find(i => i.id === item._id);
      if (exists) return prev.filter(i => i.id !== item._id);
      return [...prev, { id: item._id, name: item.name, quantity: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setSelectedItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const handleSubmit = async () => {
    if (!tableNumber || selectedItems.length === 0) {
      alert("Enter table number and select at least one item");
      return;
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/order`, {
        tableNumber,
        items: selectedItems,
        source: "captain"
      });
      alert("Captain order placed!");
      setTableNumber("");
      setSelectedItems([]);
    } catch (err) {
      console.error(err);
      alert("Order failed.");
    }
  };

  return (
    <div className="container">
      <h2>Captain Order</h2>
      <input
        className="input"
        placeholder="Table Number"
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />

      <div className="grid">
        {menu.map(item => (
          <div key={item._id} className="menu-card">
            <img
              src={`${process.env.PUBLIC_URL}/images/${item.image}`}
              onError={e => (e.target.src = item.image)}
              alt={item.name}
              className="menu-image"
            />
            <h3>{item.name}</h3>
            <p>{item.category} — ₹{item.price}</p>
            <button className="btn" onClick={() => toggleSelect(item)}>
              {selectedItems.find(i => i.id === item._id) ? "Remove" : "Add"}
            </button>
            {selectedItems.find(i => i.id === item._id) && (
              <input
                type="number"
                min="1"
                className="input"
                value={selectedItems.find(i => i.id === item._id).quantity}
                onChange={(e) => updateQty(item._id, parseInt(e.target.value))}
              />
            )}
          </div>
        ))}
      </div>

      <button className="btn" onClick={handleSubmit}>Submit Captain Order</button>
    </div>
  );
}

export default OrderPage;
