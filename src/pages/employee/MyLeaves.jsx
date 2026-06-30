import { useEffect, useState } from "react";
import API from "../../services/api";

function MyLeaves() {

  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      const res = await API.get(`/leaves/employee/${localStorage.getItem("employeeId")}`);
      setLeaves(res.data);
    };
    fetchLeaves();
  }, []);

  return (
  <div style={{ padding: "20px" }}>

    <h2 style={{ marginBottom: "20px" }}>My Leaves</h2>

    <div style={tableWrapper}>
      <table style={table}>

        <thead>
          <tr style={thead}>
            <th style={th}>From</th>
            <th style={th}>To</th>
            <th style={th}>Reason</th>
            <th style={th}>Status</th>
          </tr>
        </thead>

        <tbody>
          {leaves.length === 0 ? (
            <tr>
              <td colSpan="4" style={noData}>
                No leaves found
              </td>
            </tr>
          ) : (
            leaves.map((l, i) => (
              <tr
                key={l._id}
                style={{
                  ...row,
                  background: i % 2 === 0 ? "#f9f9f9" : "#e5e7eb"
                }}
              >
                <td style={cell}>{new Date(l.fromDate).toLocaleDateString()}</td>
                <td style={cell}>{new Date(l.toDate).toLocaleDateString()}</td>
                <td style={cell}>{l.reason}</td>
                <td style={cell}>
                  <span style={{
                    ...statusBadge,
                    background:
                      l.status === "Approved"
                        ? "#16a34a"
                        : l.status === "Rejected"
                        ? "#dc2626"
                        : "#f59e0b"
                  }}>
                    {l.status}
                  </span>
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
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const table = {
  width: "100%",
  minWidth: "480px",
  borderCollapse: "collapse",
  marginTop: "0",
  background: "white",
  borderRadius: "10px",
  overflow: "hidden",
};

const thead = {
  background: "#0f172a",
  color: "white",
  textAlign: "center",
};

const th = {
  padding: "14px 16px",
  whiteSpace: "nowrap",
  fontWeight: "600",
  fontSize: "14px",
};

const row = {
  textAlign: "center",
  color: "#333",
  height: "48px",
};

const cell = {
  padding: "10px 16px",
  whiteSpace: "nowrap",
};

const statusBadge = {
  padding: "6px 14px",
  borderRadius: "6px",
  color: "white",
  fontSize: "13px",
  fontWeight: "bold",
  display: "inline-block",
};

const noData = {
  textAlign: "center",
  padding: "20px",
  color: "#666",
};

export default MyLeaves;
