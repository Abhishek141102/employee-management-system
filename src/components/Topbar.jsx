import "./Tbar.css";

function Topbar({ handleLogout, onMenuToggle }) {
  const role = localStorage.getItem("role");
  const employeeName = localStorage.getItem("employeeName");

  return (
    <div className="topbar">
      <div className="topbar-start">
        <button
          className="hamburger-btn"
          onClick={onMenuToggle}
          aria-label="Open navigation menu"
        >
          ☰
        </button>
        <span id="welc">
          {role === "admin"
            ? "Welcome Admin 👋"
            : `Welcome ${employeeName || "Employee"} 👋`}
        </span>
      </div>

      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Topbar;
