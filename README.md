# Employee Management System

## 📖 Project Overview

A full-stack Employee Management System with role-based login for **Admin** and **Employee**. 
Admins can manage employees, departments, and approve/reject leave requests, while employees 
can apply for leave and track their leave status through a personal dashboard. Built with 
React (Vite) on the frontend and Node.js/Express with MongoDB on the backend, with secure 
password hashing using bcrypt.

## 🚀 Tech Stack

**Frontend:**
- React.js
- Vite
- Axios (API calls)
- React Router DOM

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- bcrypt (password hashing)

## ✨ Key Features

**Admin Side:**
- Secure admin login
- Add, update, and delete employee records
- Manage departments (add/update/delete, with safeguard against deleting departments that still have employees)
- View all leave requests across employees
- Approve or reject employee leave requests

**Employee Side:**
- Secure employee login
- Personal dashboard with leave statistics (total, pending, approved, rejected)
- Apply for new leave requests
- View history and status of submitted leave requests

**General:**
- Role-based access (Admin vs Employee)
- Passwords hashed using bcrypt
- RESTful API architecture
- Responsive UI for both desktop and mobile

### Frontend Setup
```bash
cd emp_ms
npm install
npm run dev
```

### Backend Setup
```bash
cd emp_ms/backend
npm install
node server.js
```