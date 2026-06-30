import EmployeeSidebar from "./EmployeeSidebar";
import EmployeeHome from "./EmployeeHome";
import ApplyLeave from "./ApplyLeave";
import MyLeaves from "./MyLeaves";
import { useState } from "react";


function EmployeeDashboard({ handleLogout }) {

  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "apply": return <ApplyLeave />;
      case "leaves": return <MyLeaves />;
      default: return <EmployeeHome />;
    }
  };

  return (
    <div style={{ display: "flex" }}>

      <EmployeeSidebar setPage={setPage} />

      <div style={{ flex: 1 }}>

        {/* Topbar */}
        <div>
          <h3>Employee Dashboard</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>

        {/* Content */}
        <div style={{ padding: "50px" }}>
          {renderPage()}
        </div>

      </div>

    </div>
  );
}


export default EmployeeDashboard;