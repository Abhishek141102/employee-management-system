import { useEffect, useState } from "react";
import API from "../../services/api";

function EmployeeHome() {
  const [stats, setStats] = useState({
    totalLeaves: 0,
    pendingLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const employeeId = localStorage.getItem("employeeId");
        const res = await API.get(`/leaves/stats/${employeeId}`);
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Leaves", value: stats.totalLeaves },
    { label: "Pending", value: stats.pendingLeaves },
    { label: "Approved", value: stats.approvedLeaves },
    { label: "Rejected", value: stats.rejectedLeaves },
  ];

  return (
    <div>
      <h2 style={{ marginLeft: "10px" }}>Dashboard Overview</h2>

      <div className="dashboard-grid">
        {cards.map((card, i) => (
          <div
            key={i}
            className="dashboard-card"
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <h4>{card.label}</h4>
            <h2>{card.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeHome;
