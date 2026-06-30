const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const Employee = require("../models/Employee");


// GET all employees
router.get("/", async (req, res) => {
  try {

    const employees = await Employee.find().select("-password");

    res.json(employees);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }
});



// CREATE employee
router.post("/", async (req, res) => {

  try {

    const { name, email, password, department } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = new Employee({
      name,
      email,
      password: hashedPassword,
      department
    });

    const saved = await employee.save();

    res.status(201).json(saved);

  } catch (err) {

    res.status(400).json({ message: err.message });

  }

});



// UPDATE employee
router.put("/:id", async (req, res) => {

  try {

    const updateData = { ...req.body };

    // if password is updated → hash it
    if (req.body.password) {
      updateData.password = await bcrypt.hash(req.body.password, 10);
    }

    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);

  } catch (err) {

    res.status(400).json({ message: err.message });

  }

});



// DELETE employee
router.delete("/:id", async (req, res) => {

  try {

    await Employee.findByIdAndDelete(req.params.id);

    res.json({ message: "Employee Deleted" });

  } catch (err) {

    res.status(400).json({ message: err.message });

  }

});

router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  try {

    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(400).json({ message: "Employee not found" });
    }

    const match = await bcrypt.compare(password, employee.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      employee
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }

});


module.exports = router;