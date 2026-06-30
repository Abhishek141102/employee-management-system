import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardHome from "./pages/DashboardHome";
import Employee from "./pages/Employees";
import Department from "./pages/Departments";
import Leaves from "./pages/Leaves";
import Settings from "./pages/Settings";
import EmployeeHome from "./pages/employee/EmployeeHome";
import ApplyLeave from "./pages/employee/ApplyLeave";
import MyLeaves from "./pages/employee/MyLeaves";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  const handleLoginSuccess = (userRole) => {
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole("");
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              role === "admin" ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/employee" />
              )
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* ================= ADMIN ROUTES ================= */}

        <Route
          path="/dashboard"
          element={
            isAuthenticated && role === "admin" ? (
              <AdminDashboard
                handleLogout={handleLogout}
                page={<DashboardHome />}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/employees"
          element={
            isAuthenticated && role === "admin" ? (
              <AdminDashboard handleLogout={handleLogout} page={<Employee />} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/departments"
          element={
            isAuthenticated && role === "admin" ? (
              <AdminDashboard
                handleLogout={handleLogout}
                page={<Department />}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/leaves"
          element={
            isAuthenticated && role === "admin" ? (
              <AdminDashboard handleLogout={handleLogout} page={<Leaves />} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        

        <Route
          path="/settings"
          element={
            isAuthenticated && role === "admin" ? (
              <AdminDashboard handleLogout={handleLogout} page={<Settings />} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* ================= EMPLOYEE ROUTE ================= */}

        <Route
          path="/employee"
          element={
            isAuthenticated && role === "employee" ? (
              <AdminDashboard
                handleLogout={handleLogout}
                page={<EmployeeHome />}
                isEmployee={true}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/employee/apply"
          element={
            isAuthenticated && role === "employee" ? (
              <AdminDashboard
                handleLogout={handleLogout}
                page={<ApplyLeave />}
                isEmployee={true}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/employee/leaves"
          element={
            isAuthenticated && role === "employee" ? (
              <AdminDashboard
                handleLogout={handleLogout}
                page={<MyLeaves />}
                isEmployee={true}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
