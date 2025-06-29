import React from "react";

function MenuCard({ item }) {
  return (
    <div className="card">
      <img src={item.image} alt={item.name} className="card-img" />
      <h3>{item.name}</h3>
      <p>{item.category}</p>
      <p>₹{item.price}</p>
      <button>Add to Cart</button>
    </div>
  );
}

export default MenuCard;
