import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/User"; // Assuming you have a User model
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// User Registration
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists. Please login." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Store Signup Information Route
router.post("/store-signup", async (req: Request, res: Response) => {
  try {
    const { email, signupTime } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Store signup information
    if (!user.signups) {
      user.signups = [];
    }
    user.signups.push(signupTime);
    await user.save();

    res.status(200).json({ message: "Signup information stored successfully." });
  } catch (error) {
    console.error("Store Signup Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// User Login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Store Login Information Route
router.post("/store-login", async (req: Request, res: Response) => {
  try {
    const { email, loginTime } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Store login information
    if (!user.logins) {
      user.logins = [];
    }
    user.logins.push(loginTime);
    await user.save();

    res.status(200).json({ message: "Login information stored successfully." });
  } catch (error) {
    console.error("Store Login Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

export default router;