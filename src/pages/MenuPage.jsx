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
//       <div className="menu-card">
//       <img
//         src={item.image || "https://via.placeholder.com/300x200.png?text=No+Image"}
//         alt={item.name}
//         className="menu-image"
//       />
//       <h3>{item.name}</h3>
//       <p><strong>Category:</strong> {item.category}</p>
//       <p><strong>Price:</strong> ₹{item.price}</p>
//       <button className="btn">Add to Cart</button>
//     </div>
//     </div>
//   );
// }

// export default MenuPage;


import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuCard from "../components/MenuCard";

function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("Calling:", `${process.env.REACT_APP_API_URL}/menu`);
    const fetchMenu = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/menu`);
      setMenu(res.data);
      localStorage.setItem("menu", JSON.stringify(res.data));
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

  return (
    <div className="container">
      <h1>Menu</h1>
      <input
        type="text"
        className="input"
        placeholder="Search food..."
        onChange={e => setSearch(e.target.value)}
      />
      <div className="grid">
        {filteredMenu.map(item => (
          <MenuCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
