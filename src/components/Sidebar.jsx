import "./Sbar.css";
import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            display: "none",
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 998,
          }}
          className="sidebar-overlay"
        />
      )}

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="sidebar-title">Employee MS</h2>

        <ul>
          <li><NavLink to="/dashboard" onClick={onClose}>Dashboard</NavLink></li>
          <li><NavLink to="/employees" onClick={onClose}>Employees</NavLink></li>
          <li><NavLink to="/departments" onClick={onClose}>Departments</NavLink></li>
          <li><NavLink to="/leaves" onClick={onClose}>Leaves</NavLink></li>
          <li><NavLink to="/settings" onClick={onClose}>Settings</NavLink></li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
