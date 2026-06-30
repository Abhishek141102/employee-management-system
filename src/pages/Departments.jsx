import { useEffect, useState } from "react";
import API from "../services/api";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: ""
  });

  const buttonStyle = {
    padding: "8px 15px",
    minWidth: "90px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px"
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

  // Fetch Departments
  const fetchDepartments = async () => {
    try {
      const res = await API.get("/departments");
      setDepartments(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Handle Input
  const handleChange = (e) => {
    setFormData({ name: e.target.value });
  };

  // Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/departments/${editingId}`, formData);
      } else {
        await API.post("/departments", formData);
      }

      setShowForm(false);
      setEditingId(null);
      setFormData({ name: "" });
      fetchDepartments();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete
  const deleteDepartment = async (id) => {
  if (!window.confirm("Delete this department?")) return;

  try {
    await API.delete(`/departments/${id}`);
    fetchDepartments();
  } catch (err) {
    alert(err.response?.data?.message || "Error deleting department");
  }
};

  // Edit
  const editDepartment = (dept) => {
    setFormData({ name: dept.name });
    setEditingId(dept._id);
    setShowForm(true);
  };

  return (
    <div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Departments</h2>
        <button
          onClick={() => {
            setFormData({ name: "" });
            setEditingId(null);
            setShowForm(true);
          }}
          style={{ ...buttonStyle, background: "#19b3d2", color: "white", marginRight: "15px", borderRadius: "5px"
           }}
        >
          + Add New Department
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
          <div
            style={{
              width: "100%",
              maxWidth: "450px",
              background: "#f5f5f5",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              color: "#333"
            }}
          >
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
              {editingId ? "Update Department" : "Add Department"}
            </h3>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label>Department Name</label>
                <input
                  type="text"
                  value={formData.name}
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
          <th>Department Name</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {departments.length === 0 ? (
          <tr>
            <td colSpan="3" style={noData}>
              No Departments Found
            </td>
          </tr>
        ) : (
          departments.map((dept, index) => (
            <tr
              key={dept._id}
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
              <td>{dept.name}</td>

              <td>
                <button
                  onClick={() => editDepartment(dept)}
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
                  onClick={() => deleteDepartment(dept._id)}
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
  minWidth: "350px",
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


export default Departments;