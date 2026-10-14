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

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  }),
);

app.use(express.json());
app.use("/api/employees", employeeRoutes);
app.use("/api/departments", deptRoutes);
app.use("/api/dashboard", dashRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/leaves", leaveRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Employee Management API is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
