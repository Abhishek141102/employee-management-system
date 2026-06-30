import { useEffect, useState } from "react";
import API from "../services/api";

function DashboardHome() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    totalLeaves: 0,
    pendingLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Employees", value: stats.totalEmployees },
    { label: "Total Departments", value: stats.totalDepartments },
    { label: "Total Leaves", value: stats.totalLeaves },
    { label: "Pending Leaves", value: stats.pendingLeaves },
    { label: "Approved Leaves", value: stats.approvedLeaves },
    { label: "Rejected Leaves", value: stats.rejectedLeaves },
  ];

  return (
    <div>
      <h2>Dashboard Overview</h2>

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

export default DashboardHome;
