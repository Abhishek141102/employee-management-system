import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import EmployeeSidebar from "./employee/EmployeeSidebar";

function AdminDashboard({ handleLogout, page, isEmployee }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // Close sidebar on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>

      {isEmployee ? (
        <EmployeeSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      ) : (
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <Topbar handleLogout={handleLogout} onMenuToggle={toggleSidebar} />

        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          {page}
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;
