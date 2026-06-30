import { useState } from "react";
import API from "../services/api";

function Settings() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const buttonStyle = {
    padding: "8px 15px",
    minWidth: "90px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    display: "block",
    margin: "0 auto"
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#ffffff",
    color: "#000000",
    width: "100%",
    outline: "none",
    fontSize: "14px"
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put("/admin/update", formData);
      alert("Credentials updated successfully");

      setFormData({ email: "", password: "" });
    } catch (err) {
      alert("Error updating credentials");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          marginTop: "50px",
          background: "#f5f5f5",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          color: "#333"
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          Admin Settings
        </h3>

        <form onSubmit={handleSubmit}>

          <div style={{ marginBottom: "20px" }}>
            <label>New Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="submit"
              style={{ ...buttonStyle, background: "#2e7d32", color: "white"}}
            >
              Update Credentials
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Settings;