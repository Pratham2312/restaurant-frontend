import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import OrderPage from "./pages/OrderPage";
import AdminPage from "./pages/AdminPage";
import CaptainPage from "./pages/CaptainPage";

import "./styles.css";

function App() {
  return (
    <Router>
      <nav className="nav">
        <Link to="/">Menu</Link>
        <Link to="/order">Captain</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/captain" element={<CaptainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
