# 💰 Personal Finance Tracker using MERN Stack

A full-stack web application that helps users track their **income**, **expenses**, and **total balance** effectively. 
Built with **MERN stack** during an internship, the project features user authentication, categorized transactions, and insightful visualizations to manage personal finances.

---

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Authentication](#authentication)
- [Sample Routes](#routes)
- [Environment Variables](#environmentsVariable)
- [Project Screen](#projectScreen)

---

## ✅ Features

- 🔐 User Authentication (Register/Login using JWT & Cookies)
- ➕ Add Income and Expense entries
- 📈 Real-time Dashboard with:
  - Total Income
  - Total Expenses
  - Balance Calculation
  - Bar and Pie Charts for insights
- 📃 Filterable Income & Expense History
- 🗑️ Delete any transaction
- ⚙️ Protected Routes (Non-authenticated users redirected to login)
- 🎨 Responsive UI using Tailwind CSS

---

## 🚀 Tech Stack

### 🔧 Frontend:
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM
- React Icons

### 🛠 Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- dotenv
- cookie-parser

---

## 🔐 Authentication
- JWT tokens are generated on successful login/register and stored in cookies.
- The frontend checks for token using js-cookie and conditionally renders components.
- Protected routes redirect to login if token is not present.

---

## 🧪 Sample Routes

### 🔑 Auth:
- POST /api/user/register
- POST /api/user/login

---

### 💰 Income:
- POST /api/user/add-income
- GET /api/user/get-income
- DELETE /api/user/delete-income/:id

### 💸 Expense:
- POST /api/user/add-expense
- GET /api/user/get-expense
- DELETE /api/user/delete-expense/:id

## 🔒 Environment Variables
Place inside backend/.env:
  MONGO_URL=mongodb+srv://your-db-url, 
  JWT_SECRET=anySecretKey

## 📊 Project Screens
- Dashboard with Income/Expense Charts
- Add Income/Expense Form
- Expense History Table
- Income History Table
- Responsive Sidebar Navigation
- Login/Register Forms with Validation
