import "./Auth.css";
import { useState } from "react";
import API from "../services/api";

function Login({ onLoginSuccess }) {

  const [role, setRole] = useState("admin"); // default admin
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Invalid email format.");
      return;
    }

    try {

      if (role === "admin") {
        await API.post("/admin/login", { email, password });

        localStorage.setItem("role", "admin");
      }

      else {
        const res = await API.post("/employees/login", { email, password });

        localStorage.setItem("role", "employee");
        localStorage.setItem("employeeId", res.data.employee._id);
        localStorage.setItem("employeeName", res.data.employee.name);
      }

      setError("");
      onLoginSuccess(role); // pass role to App.jsx

    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>{role === "admin" ? "Admin Login" : "Employee Login"}</h2>

        {/* Toggle */}
        <div style={{ display: "flex", marginBottom: "15px" }}>
          <button
            onClick={() => setRole("admin")}
            style={{
              flex: 1,
              background: role === "admin" ? "#ffffff" : "#ccc",
              color: "#5a4bda",
              border: "none",
              padding: "8px",
              cursor: "pointer",
              marginRight: "5px",
              boxShadow: role === "admin" ? "0 2px 6px rgba(0,0,0,0.2)" : "none",
            }}
          >
            Admin
          </button>

          <button
            onClick={() => setRole("employee")}
            style={{
              flex: 1,
              background: role === "employee" ? "#ffffff" : "#ccc",
              color: "#5a4bda",
              border: "none",
              padding: "8px",
              cursor: "pointer",
              boxShadow: role === "employee" ? "0 2px 6px rgba(0,0,0,0.2)" : "none"
            }}
          >
            Employee
          </button>
        </div>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder={role === "admin" ? "Admin Email" : "Employee Email"}
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Login</button>

        </form>

      </div>
    </div>
  );
}

export default Login;