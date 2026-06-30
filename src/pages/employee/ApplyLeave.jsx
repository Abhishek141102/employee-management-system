import { useState } from "react";
import API from "../../services/api";
import "./applyleave.css";

function ApplyLeave() {

  const [form, setForm] = useState({
    fromDate: "",
    toDate: "",
    reason: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/leaves", {
      ...form,
      employeeId: localStorage.getItem("employeeId")
    });

    alert("Leave Applied");
  };

  return (
  <div style={container}>

    <div style={formBox}>

      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        Apply Leave
      </h3>

      <form onSubmit={handleSubmit}>

        <label>From Date</label>
        <input type="date" name="fromDate" onChange={handleChange} style={input}/>

        <label>To Date</label>
        <input type="date" name="toDate" onChange={handleChange} style={input}/>

        <label>Reason</label>
        <input
          type="text"
          name="reason"
          placeholder="Enter reason"
          onChange={handleChange}
          style={input}
        />

        <button className="submit-btn">Submit</button>

      </form>

    </div>

  </div>
);
}

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: "20px",
  minHeight: "80vh",
};

const formBox = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  width: "100%",
  maxWidth: "450px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  color: "#333",
};

const input = {
  display: "block",
  width: "100%",
  marginBottom: "20px",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #333",
  outline: "none",
  color: "#333",
  background: "#fff",
  colorScheme: "light"
};


export default ApplyLeave;