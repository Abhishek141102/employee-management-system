const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");


// 🔐 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// 🔐 UPDATE ADMIN CREDENTIALS
router.put("/update", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne();

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    admin.email = email;
    admin.password = hashedPassword;

    await admin.save();

    res.json({ message: "Credentials updated successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;