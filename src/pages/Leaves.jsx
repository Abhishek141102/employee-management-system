import { useEffect, useState } from "react";
import API from "../services/api";

function Leaves() {

  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const res = await API.get("/leaves");
      setLeaves(res.data);
    } catch (err) {
      console.error("Error fetching leaves:", err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const updateStatus = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status.toLowerCase()} this leave request?`)) {
      return;
    }
    try {
      await API.put(`/leaves/${id}`, { status });
      fetchLeaves();
    } catch (err) {
      console.error("Error updating leave:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2 style={{ marginBottom: "20px" }}>Leave Requests</h2>

      <div style={tableWrapper}>
        <table style={table}>

          <thead>
            <tr style={thead}>
              <th style={{ padding: "14px 12px", whiteSpace: "nowrap" }}>Employee</th>
              <th>Department</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan="7" style={noData}>
                  No Leave Requests
                </td>
              </tr>
            ) : (
              leaves.map((leave, index) => (
                <tr
                  key={leave._id}
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
                  <td>{leave.employeeId?.name}</td>
                  <td>{leave.employeeId?.department}</td>
                  <td>{new Date(leave.fromDate).toLocaleDateString()}</td>
                  <td>{new Date(leave.toDate).toLocaleDateString()}</td>
                  <td>{leave.reason}</td>

                  <td>
                    <span style={{
                      ...statusBadge,
                      background:
                        leave.status === "Approved"
                          ? "#16a34a"
                          : leave.status === "Rejected"
                          ? "#dc2626"
                          : "#f59e0b"
                    }}>
                      {leave.status}
                    </span>
                  </td>

                  <td>
                    {leave.status === "Pending" && (
                      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                        <button
                          onClick={() => updateStatus(leave._id, "Approved")}
                          style={{ ...buttonStyle, background: "#22c55e", color: "white" }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(leave._id, "Rejected")}
                          style={{ ...buttonStyle, background: "#ef4444", color: "white" }}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}

const tableWrapper = {
  width: "100%",
  overflowX: "auto",
  WebkitOverflowScrolling: "touch",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const table = {
  width: "100%",
  minWidth: "650px",
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

const statusBadge = {
  padding: "7px 12px",
  borderRadius: "6px",
  color: "white",
  fontSize: "14px",
  fontWeight: "bold"
};

const buttonStyle = {
  padding: "6px 14px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "500",
  transition: "all 0.2s ease"
};

export default Leaves;