# 👥 Employee Management System

A full-stack Employee Management System with role-based login for **Admin** and **Employee** users. Admins can manage employee records and departments, and review leave requests. Employees can apply for leave and track their request status through a personal dashboard.

Built with **React + Vite** on the frontend and **Node.js + Express.js + MongoDB** on the backend, with password hashing using bcrypt.

## 🚀 Tech Stack

### Frontend
- React.js
- Vite
- Axios — API requests
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt — password hashing

### Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

## ✨ Key Features

### Admin Side
- Secure admin login
- Add, update, and delete employee records
- Manage departments (add, update, and delete)
- Prevent department deletion when employees are still assigned to it
- View leave requests across employees
- Approve or reject employee leave requests

### Employee Side
- Secure employee login
- Personal dashboard with leave statistics:
  - Total leave requests
  - Pending requests
  - Approved requests
  - Rejected requests
- Apply for new leave requests
- View leave request history and status

### General
- Role-based access control (Admin vs Employee)
- Password hashing using bcrypt
- RESTful API architecture
- Responsive UI for desktop and mobile

## ☁️ Live Deployment

- **Frontend:** Deployed on Vercel
- **Backend API:** Deployed on Render
- **Cloud Database:** MongoDB Atlas