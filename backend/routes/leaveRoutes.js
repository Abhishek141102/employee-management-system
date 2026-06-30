const express = require("express");
const router = express.Router();

const Leave = require("../models/Leaves");


/* APPLY LEAVE (Employee) */
router.post("/", async (req, res) => {

  try {

    const leave = new Leave(req.body);

    await leave.save();

    res.json({
      message: "Leave request submitted",
      leave
    });

  } catch (err) {

    res.status(500).json({ message: "Server error" });

  }

});



/* GET ALL LEAVES (Admin) */
router.get("/", async (req, res) => {

  try {

    const leaves = await Leave.find()
      .populate("employeeId", "name email department")
      .sort({ createdAt: -1 });

    res.json(leaves);

  } catch (err) {

    res.status(500).json({ message: "Server error" });

  }

});



/* GET EMPLOYEE LEAVES */
router.get("/employee/:id", async (req, res) => {

  try {

    const leaves = await Leave.find({
      employeeId: req.params.id
    }).sort({ createdAt: -1 });

    res.json(leaves);

  } catch (err) {

    res.status(500).json({ message: "Server error" });

  }

});



/* 🔥 EMPLOYEE DASHBOARD STATS */
router.get("/stats/:employeeId", async (req, res) => {

  try {

    const { employeeId } = req.params;

    const totalLeaves = await Leave.countDocuments({ employeeId });

    const pendingLeaves = await Leave.countDocuments({
      employeeId,
      status: "Pending"
    });

    const approvedLeaves = await Leave.countDocuments({
      employeeId,
      status: "Approved"
    });

    const rejectedLeaves = await Leave.countDocuments({
      employeeId,
      status: "Rejected"
    });

    res.json({
      totalLeaves,
      pendingLeaves,
      approvedLeaves,
      rejectedLeaves
    });

  } catch (err) {

    res.status(500).json({ message: "Error fetching stats" });

  }

});



/* APPROVE / REJECT LEAVE (Admin) */
router.put("/:id", async (req, res) => {

  try {

    const { status } = req.body;

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    leave.status = status;
    await leave.save();

    res.json({
      message: "Leave status updated",
      leave
    });

  } catch (err) {

    res.status(500).json({ message: "Server error" });

  }

});


module.exports = router;