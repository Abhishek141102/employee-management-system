import { NavLink } from "react-router-dom";
import "../../components/Sbar.css";

function EmployeeSidebar({ isOpen, onClose }) {
  return (
    <>
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
          <li>
            <NavLink to="/employee" end onClick={onClose}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/employee/apply" onClick={onClose}>
              Apply Leave
            </NavLink>
          </li>
          <li>
            <NavLink to="/employee/leaves" onClick={onClose}>
              My Leaves
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default EmployeeSidebar;
