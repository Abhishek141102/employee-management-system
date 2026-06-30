const express = require("express");
const router = express.Router();
const Department = require("../models/Department");
const Employee = require("../models/Employee");

// GET all
router.get("/", async (req, res) => {
  const departments = await Department.find();
  res.json(departments);
});

// POST
router.post("/", async (req, res) => {
  const dept = new Department(req.body);
  const saved = await dept.save();
  res.json(saved);
});

// PUT
router.put("/:id", async (req, res) => {
  const updated = await Department.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Check if employees exist
    const employees = await Employee.find({
      department: department.name
    });

    if (employees.length > 0) {
      return res.status(400).json({
        message: "Cannot delete department. Employees exist in this department."
      });
    }

    await Department.findByIdAndDelete(req.params.id);

    res.json({ message: "Department deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;