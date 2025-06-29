// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import MenuCard from "../components/MenuCard";

// // function MenuPage() {
// //   const [menu, setMenu] = useState([]);
// //   const [search, setSearch] = useState("");

// //   useEffect(() => {
// //     console.log("Calling:", `${process.env.REACT_APP_API_URL}/menu`);
// //     const fetchMenu = async () => {
// //       const res = await axios.get(`${process.env.REACT_APP_API_URL}/menu`);
// //       setMenu(res.data);
// //       localStorage.setItem("menu", JSON.stringify(res.data));
// //     };

// //     if (navigator.onLine) {
// //       fetchMenu();
// //     } else {
// //       const cached = localStorage.getItem("menu");
// //       if (cached) setMenu(JSON.parse(cached));
// //     }
// //   }, []);

// //   const filteredMenu = menu.filter(item =>
// //     item.name.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (
// //     <div className="container">
// //       <h1>Menu</h1>
// //       <input
// //         type="text"
// //         className="input"
// //         placeholder="Search food..."
// //         onChange={e => setSearch(e.target.value)}
// //       />
// //       <div className="menu-card">
// //       <img
// //         src={item.image || "https://via.placeholder.com/300x200.png?text=No+Image"}
// //         alt={item.name}
// //         className="menu-image"
// //       />
// //       <h3>{item.name}</h3>
// //       <p><strong>Category:</strong> {item.category}</p>
// //       <p><strong>Price:</strong> ₹{item.price}</p>
// //       <button className="btn">Add to Cart</button>
// //     </div>
// //     </div>
// //   );
// // }

// // export default MenuPage;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import MenuCard from "../components/MenuCard";

// function MenuPage() {
//   const [menu, setMenu] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     console.log("Calling:", `${process.env.REACT_APP_API_URL}/menu`);
//     const fetchMenu = async () => {
//       const res = await axios.get(`${process.env.REACT_APP_API_URL}/menu`);
//       setMenu(res.data);
//       localStorage.setItem("menu", JSON.stringify(res.data));
//     };

//     if (navigator.onLine) {
//       fetchMenu();
//     } else {
//       const cached = localStorage.getItem("menu");
//       if (cached) setMenu(JSON.parse(cached));
//     }
//   }, []);

//   const filteredMenu = menu.filter(item =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="container">
//       <h1>Menu</h1>
//       <input
//         type="text"
//         className="input"
//         placeholder="Search food..."
//         onChange={e => setSearch(e.target.value)}
//       />
//       <div className="grid">
//         {filteredMenu.map(item => (
//           <MenuCard key={item._id} item={item} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MenuPage;
import React, { useEffect, useState } from "react";
import axios from "axios";

function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/menu`);
        setMenu(res.data);
        localStorage.setItem("menu", JSON.stringify(res.data));
      } catch (error) {
        console.error("Failed to load menu", error);
      }
    };

    if (navigator.onLine) {
      fetchMenu();
    } else {
      const cached = localStorage.getItem("menu");
      if (cached) setMenu(JSON.parse(cached));
    }
  }, []);

  const filteredMenu = menu.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item._id);
      if (exists) {
        return prev.map((i) =>
          i.id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { id: item._id, name: item.name, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const changeQuantity = (id, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  const handlePlaceOrder = async () => {
    if (!tableNumber || cart.length === 0) {
      alert("Please enter table number and add items to cart.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/order`, {
        tableNumber,
        items: cart,
        source: "customer"
      });
      alert("Order placed!");
      setCart([]);
      setTableNumber("");
    } catch (error) {
      console.error("Order error:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="container">
      <h2>Menu</h2>

      <input
        className="input"
        placeholder="Search food..."
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "0.5rem" }}
      />

      <input
        className="input"
        placeholder="Table Number"
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />

      <div className="grid">
        {filteredMenu.map((item) => (
          <div key={item._id} className="menu-card">
            <img
              src={`${process.env.PUBLIC_URL}/images/${item.image}`}
              onError={(e) =>
                (e.target.src = item.image || "https://via.placeholder.com/300x200.png?text=No+Image")
              }
              alt={item.name}
              className="menu-image"
            />
            <h3>{item.name}</h3>
            <p>{item.category} — ₹{item.price}</p>
            <button className="btn" onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      {cart.length > 0 && (
        <div className="cart">
          <h3>Your Cart</h3>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => changeQuantity(item.id, parseInt(e.target.value))}
              />
              <button className="btn" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <button className="btn" onClick={handlePlaceOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
}

export default MenuPage;
