import "./Tbar.css";

function Topbar({ handleLogout, onMenuToggle }) {

  const role = localStorage.getItem("role");
  const employeeName = localStorage.getItem("employeeName");

  return (
    <div className="topbar">

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button className="hamburger-btn" onClick={onMenuToggle}>
          ☰
        </button>
        <span id="welc">
          {role === "admin"
            ? "Welcome Admin 👋"
            : `Welcome ${employeeName || "Employee"} 👋`}
        </span>
      </div>

      <button onClick={handleLogout}>Logout</button>

    </div>
  );
}


export default Topbar;
