const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const deptRoutes = require("./routes/deptRoutes");
const dashRoutes = require("./routes/dashRoutes");
const adminRoutes = require("./routes/adminRoutes");
const leaveRoutes = require("./routes/leaveRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/employees", employeeRoutes);
app.use("/api/departments", deptRoutes);
app.use("/api/dashboard", dashRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/leaves", leaveRoutes);

app.get("/", (req, res) => {
  res.send();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});