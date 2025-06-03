import bcrypt from "bcrypt";
import { User } from "../models/User.js";  // Simplify - ab sirf User model use karenge

export const signup = async (req, res) => {
  try {
    console.log("📩 Signup Request Received:", req.body);

    let { email, password, role, phone } = req.body;

    // Basic validation
    if (!email || !password || !role || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Trim and normalize
    email = email.trim();
    password = password.trim();
    role = role.trim().toLowerCase();
    phone = phone.trim();

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with basic fields only
    const newUser = new User({
      email,
      phone,
      password: hashedPassword,
      role,
      isPhoneVerified: false,
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful. Please verify your phone using Firebase OTP.",
    });

  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
