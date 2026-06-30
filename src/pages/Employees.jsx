import { useEffect, useState } from "react";
import API from "../services/api";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: ""
  });

  // Common Button Style
  const buttonStyle = {
    padding: "8px 15px",
    minWidth: "90px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px"
  };

  // Input Style (Fixes Black Input Issue)
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

  // Fetch Employees
  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/employees/${editingId}`, formData);
      } else {
        await API.post("/employees", formData);
      }

      setShowForm(false);
      setEditingId(null);
      setFormData({ name: "", email: "", department: "" });
      fetchEmployees();
    } catch (err) {
      console.error("Error saving employee:", err);
    }
  };

  // Delete
  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await API.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  // Edit
  const editEmployee = (emp) => {
    setFormData({
      name: emp.name,
      email: emp.email,
      department: emp.department
    });
    setEditingId(emp._id);
    setShowForm(true);
  };

  return (
    <div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Employees</h2>
        <button
          onClick={() => {
            setFormData({ name: "", email: "", department: "" });
            setEditingId(null);
            setShowForm(true);
          }}
          style={{ ...buttonStyle, background: "#19b3d2", color: "white", marginRight: "15px", borderRadius: "5px" }}
        >
          + Add New Employee
        </button>
      </div>

      {/* Form Card */}
      {showForm && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
          <div
            style={{
              width: "100%",
              maxWidth: "450px",
              background: "#f9f9f9",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              color: "#333"
            }}
          >
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
              {editingId ? "Update Employee" : "Add Employee"}
            </h3>

            <form onSubmit={handleSubmit}>

              <div style={{ marginBottom: "15px" }}>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  type="submit"
                  style={{ ...buttonStyle, background: "#2e7d32", color: "white" }}
                >
                  {editingId ? "Update" : "Submit"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  style={{ ...buttonStyle, background: "#d32f2f", color: "white" }}
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
  <p>Loading...</p>
) : (
  <div className="table-wrapper" style={{ marginTop: "20px" }}>

    <table style={table}>

      <thead>
        <tr style={thead}>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees.length === 0 ? (
          <tr>
            <td colSpan="5" style={noData}>
              No Employees Found
            </td>
          </tr>
        ) : (
          employees.map((emp, index) => (
            <tr
              key={emp._id}
              style={{
                ...row,
                background: index % 2 === 0 ? "#f9fafb" : "#e5e7eb"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f1f5f9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  index % 2 === 0 ? "#f9fafb" : "#e5e7eb";
              }}
            >

              <td>{index + 1}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>

              <td>
                <button
                  onClick={() => editEmployee(emp)}
                  style={{
                    ...buttonStyle,
                    background: "#f59e0b",
                    color: "white",
                    marginRight: "8px"
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteEmployee(emp._id)}
                  style={{
                    ...buttonStyle,
                    background: "#ef4444",
                    color: "white"
                  }}
                >
                  Delete
                </button>
              </td>

            </tr>
          ))
        )}
      </tbody>

    </table>

  </div>
)}
    </div>
  );
}

const table = {
  width: "100%",
  minWidth: "520px",
  borderCollapse: "collapse",
  background: "white",
  borderRadius: "10px",
  overflow: "hidden",
};

const thead = {
  background: "#0f172a",
  color: "white",
  textAlign: "center",
  height: "50px"
};

const row = {
  textAlign: "center",
  color: "#333",
  height: "50px",
  transition: "0.2s"
};

const noData = {
  textAlign: "center",
  padding: "20px",
  color: "#666"
};

export default Employees;