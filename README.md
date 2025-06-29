# 🍽️ Restaurant Menu Web App – Frontend

This is the React-based frontend of a Restaurant Ordering System that supports both customer and captain ordering, with offline capabilities and admin monitoring.

## 🌐 Live Deployment
👉 [Frontend Live URL](https://your-netlify-url.netlify.app)  
_(Replace this with your actual Netlify URL after deployment)_

---

## ✨ Features

- 📜 Displays 5–8 food items with:
  - Image
  - Name
  - Category
  - Price
- 🔍 Search and filter bar
- 🛒 Add to Cart (for customers)
- 🧾 Place Order with table number
- 👤 Dual Flow Support:
  - **Customer:** Cart-based ordering
  - **Captain:** Direct order placement
- 🖼️ Loads images from local `/public/images`, falls back to external URL or placeholder
- 📡 Offline Support using `localStorage`
- 🛠 Admin Dashboard to monitor all orders

---

## 🧩 Tech Stack

- React.js
- Axios
- React Router DOM
- CSS (vanilla)
- Netlify (deployment)

---

## 📁 Folder Structure

restaurant-frontend/
├── public/
│ ├── images/ # Local menu item images
│ │ ├── Butter Naan.jpeg
│ │ ├── Margherita.jpeg
│ │ ├── Chocolate Brownie.jpeg
│ │ └── ...
│ └── index.html
├── src/
│ ├── components/
│ │ └── MenuCard.jsx
│ ├── pages/
│ │ ├── MenuPage.jsx
│ │ ├── OrderPage.jsx
│ │ ├── CaptainPage.jsx
│ │ └── AdminPage.jsx
│ ├── styles.css
│ ├── App.jsx
│ └── index.js
├── .env
├── package.json
└── README.md

REACT_APP_API_URL=https://restaurant-backend-ordb.onrender.com/api

## 🚀 Getting Started

Install dependencies and run locally:
npm install
npm start

To create a production build:
npm run build