const express = require("express");
const router = express.Router();

const Employee = require("../models/Employee");
const Department = require("../models/Department");
const Leave = require("../models/Leaves");

router.get("/stats", async (req, res) => {
  try {

    const totalEmployees = await Employee.countDocuments();
    const totalDepartments = await Department.countDocuments();

    const totalLeaves = await Leave.countDocuments();
    const pendingLeaves = await Leave.countDocuments({ status: "Pending" });
    const approvedLeaves = await Leave.countDocuments({ status: "Approved" });
    const rejectedLeaves = await Leave.countDocuments({ status: "Rejected" });

    res.json({
      totalEmployees,
      totalDepartments,
      totalLeaves,
      pendingLeaves,
      approvedLeaves,
      rejectedLeaves
    });

  } catch (err) {
    res.status(500).json({ message: "Error fetching stats" });
  }
});

module.exports = router;